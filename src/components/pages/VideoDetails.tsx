import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams, Link } from 'react-router-dom';

import { getVideo, GetVideoResponse } from '@/api/videos';
import { getChats, GetChatsResponse } from '@/api/chats';
import { ExpandableTextView } from '../organisms/ExpandableTextView';
import { PrettyTableItem, PrettyTable } from '../organisms/PrettyTable';
import { ExternalLink } from '../molecules/ExternalLink';
import { ChatList } from '../organisms/ChatList';
import { TotalPurchaseAmounts } from '../molecules/TotalPurchaseAmounts';

export const VideoDetails: React.FC = () => {
  const { id } = useParams();

  const [video, setVideo] = useState<GetVideoResponse>();
  const [chats, setChats] = useState<GetChatsResponse>([]);

  useEffect(() => {
    getVideo(id).then(setVideo);
  }, []);

  if (!video) {
    return <></>;
  }

  const overviewItems: PrettyTableItem[] = [
    {
      title: 'Video ID',
      content: (
        <ExternalLink href={`https://www.youtube.com/watch?v=${video.videoId}`}>
          {video.videoId}
        </ExternalLink>
      ),
    },
    {
      title: 'Channel',
      content: (
        <Link to={`/channels/${video.channel.channelId}`} className="link">
          {video.channel.name}
        </Link>
      ),
    },
    {
      title: 'Live started at',
      content: dayjs(video.liveStartedAt).format('YYYY/MM/DD hh:mm:ss'),
    },
    {
      title: 'Live ended at',
      content: dayjs(video.liveEndedAt).format('YYYY/MM/DD hh:mm:ss'),
    },
    {
      title: 'Length',
      content: dayjs()
        .startOf('day')
        .add(video.lengthSeconds, 's')
        .format(video.lengthSeconds < 3600 ? 'mm:ss' : 'hh:mm:ss'),
    },
    {
      title: 'Super Chat amount',
      content: <TotalPurchaseAmounts totalPurchaseAmounts={video.totalPurchaseAmounts} />,
    },
    {
      title: 'Private',
      content: video.isPrivate ? 'private' : 'public',
    },
    {
      title: 'Updated at',
      content: dayjs(video.updatedAt).format('YYYY/MM/DD hh:mm:ss'),
    },
  ];

  const onChatListScroll = (offset: number, limit: number): Promise<number> => {
    return getChats({ videoId: id, offset, limit }).then((newChats) => {
      setChats([...chats, ...newChats]);
      return newChats.length;
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto py-8">
      <div className="sticky top-0 lg:relative lg:top-auto">
        <div className="youtube">
          <iframe src={`https://www.youtube.com/embed/${video.videoId}`} />
        </div>
      </div>
      <div className="pl-1 pt-1">
        <h3 className="font-bold text-xl">{video.title}</h3>
        <div className="pt-2">
          <ExpandableTextView text={video.description} />
        </div>
      </div>
      <div className="w-full pt-4">
        <span className="font-bold text-md ml-1">Overview</span>
        <PrettyTable items={overviewItems} />
      </div>
      <div className="pt-4">
        <span className="font-bold text-md ml-1">Chats</span>
        <ChatList
          chats={chats}
          onScroll={onChatListScroll}
          showChannelName={true}
          showOffsetTime={true}
        />
      </div>
    </div>
  );
};
