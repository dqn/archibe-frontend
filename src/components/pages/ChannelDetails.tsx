import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';

import { getChannel, GetChannelResponse } from '@/api/channels';
import { getChats, GetChatsResponse } from '@/api/chats';
import { improveImageQuality } from '@/lib/youtube';

import { ExternalLink } from '../atoms/ExternalLink';
import { SuperChats } from '../molecules/SuperChats';
import { ChatViewer } from '../organisms/ChatViewer';
import { PrettyTable, PrettyTableItem } from '../organisms/PrettyTable';

export const ChannelDetails: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const [channel, setChannel] = useState<GetChannelResponse>();
  const [chats, setChats] = useState<GetChatsResponse>([]);

  useEffect(() => {
    getChannel(id).then(setChannel);
  }, []);

  if (!channel) {
    return <></>;
  }

  const overviewItems: Readonly<PrettyTableItem>[] = [
    {
      title: 'Channel',
      content: (
        <ExternalLink href={`https://www.youtube.com/channel/${channel.channelId}`}>
          YouTube
        </ExternalLink>
      ),
    },
    {
      title: 'Sent chats',
      content: channel.sentChatCount,
    },
    {
      title: 'Recieved chats',
      content: channel.receivedChatCount,
    },
    {
      title: 'Sent Super Chat amount',
      content: <SuperChats superChats={channel.sentSuperChats} />,
    },
    {
      title: 'Received Super Chat amount',
      content: <SuperChats superChats={channel.receivedSuperChats} />,
    },
    {
      title: 'Updated at',
      content: dayjs(channel.updatedAt).format('YYYY/MM/DD HH:mm:ss'),
    },
  ];

  const handleChatViewerScroll = (offset: number, limit: number): Promise<number> => {
    return getChats({ channelId: id, offset, limit, order: 'desc' }).then((newChats) => {
      setChats([...chats, ...newChats]);
      return newChats.length;
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-10">
      <div className="lg:flex">
        <div className="w-full lg:w-auto">
          <img
            className="rounded-full w-32 h-32 mx-auto"
            src={improveImageQuality(channel.imageUrl)}
          />
        </div>
        <div className="font-bold text-center mt-3 text-3xl mx-3 lg:ml-8">
          <div className="lg:text-left">{channel.name}</div>
          <div className="flex justify-center lg:justify-start">
            {channel.badges
              .filter((badge) => badge.badgeType === 'member')
              .map((badge, i) => (
                <Tooltip key={i} title={badge.label}>
                  <img src={badge.imageUrl} className="w-6 h-6" />
                </Tooltip>
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-5">
        <div className="w-full">
          <span className="font-bold text-md ml-1">Overview</span>
          <PrettyTable items={overviewItems} />
        </div>
        <div className="mt-6">
          <span className="font-bold text-md ml-1">Videos</span>
          <div className="flex flex-wrap">
            {channel.videos.map((video, i) => (
              <div key={i} className="w-full lg:w-1/4 flex flex-wrap lg:px-2 mb-6">
                <div
                  className="w-1/2 lg:w-full relative cursor-pointer"
                  onClick={() => history.push(`/videos/${video.videoId}`)}
                >
                  <img src={video.thumbnailUrl} />
                  <div className="opacity-75 bg-black text-white absolute right-0 bottom-0 px-2 m-2 rounded">
                    {dayjs()
                      .startOf('day')
                      .add(video.lengthSeconds, 's')
                      .format(video.lengthSeconds < 3600 ? 'mm:ss' : 'H:mm:ss')}
                  </div>
                </div>
                <div className="w-1/2 lg:w-full pl-1 lg:pl-0 text-sm">
                  <Link to={`/videos/${video.videoId}`}>
                    <VideoTitle>{video.title}</VideoTitle>
                  </Link>
                  <div className="mt-1">{dayjs(video.liveStartedAt).format('YYYY/MM/DD')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <span className="font-bold text-md ml-1">Recent chats</span>
          <ChatViewer chats={chats} onScroll={handleChatViewerScroll} showDatetime />
        </div>
      </div>
    </div>
  );
};

const VideoTitle = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
