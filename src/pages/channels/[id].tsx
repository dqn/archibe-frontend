import dayjs from 'dayjs';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Tooltip } from 'react-tippy';

import { getChannel, GetChannelResponse } from '@/api/channels';
import { getChats, GetChatsResponse } from '@/api/chats';
import { getVideos, GetVideosResponse } from '@/api/videos';
import { ExternalLink } from '@/components/atoms/ExternalLink';
import { SuperChats } from '@/components/molecules/SuperChats';
import { ChatViewer } from '@/components/organisms/ChatViewer';
import { PrettyTable, PrettyTableItem } from '@/components/organisms/PrettyTable';
import { VideoList } from '@/components/organisms/VideoList';
import { Tabs } from '@/components/templetes/Tabs';
import { improveImageQuality } from '@/lib/youtube';

type Props = {
  channel: GetChannelResponse;
};

type Params = {
  id: string;
};

export const ChannelDetails: NextPage<Props> = ({ channel }) => {
  const router = useRouter();

  const id = router.query.id as string;

  const [chats, setChats] = useState<GetChatsResponse>([]);
  const [videos, setVideos] = useState<GetVideosResponse>([]);

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

  const handleVideoListScroll = (offset: number, limit: number): Promise<number> => {
    return getVideos({ channelId: id, offset, limit, order: 'desc' }).then((newVideos) => {
      setVideos([...videos, ...newVideos]);
      return newVideos.length;
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
      </div>
      <Tabs
        tabs={[
          {
            name: 'CHATS',
            content: (
              <div className="mt-2">
                <ChatViewer chats={chats} onScroll={handleChatViewerScroll} showDatetime />
              </div>
            ),
          },
          {
            name: 'VIDEOS',
            content: (
              <div className="mt-4">
                <VideoList videos={videos} onScroll={handleVideoListScroll} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  if (!params?.id) throw new TypeError('ID is required.');

  const channel = await getChannel(params.id);
  return { props: { channel } };
};

export default ChannelDetails;
