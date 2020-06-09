import React, { useEffect, useState } from 'react';

// import ModeratorIcon from '@/assets/moderator.svg';
import { getVideo, GetVideoResponse } from '@/api/videos';
import { useParams } from 'react-router-dom';
// import { improveImageQuality } from '@/lib/youtube';
import { getChats, GetChatsResponse } from '@/api/chats';
import { ExpandableTextView } from '../organisms/ExpandableTextView';
import { PrettyTableItem, PrettyTable } from '../organisms/PrettyTable';
import dayjs from 'dayjs';

export const VideoDetails: React.FC = () => {
  const { id } = useParams();

  const [video, setVideo] = useState<GetVideoResponse>();
  const [chats, setChats] = useState<GetChatsResponse>();

  useEffect(() => {
    getVideo(id).then(setVideo);
    getChats({ channelId: id }).then(setChats);
  }, []);

  if (!video || !chats) {
    return <></>;
  }

  const overviewItems: PrettyTableItem[] = [
    {
      title: 'Video ID',
      content: <a href={`https://www.youtube.com/watch?v=${video.videoId}`}>{video.videoId}</a>,
    },
    {
      title: 'Channel',
      content: (
        <a href={`https://www.youtube.com/channel/${video.channel.channelId}`}>
          {video.channel.name}
        </a>
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
      content: dayjs().startOf('day').add(video.lengthSeconds, 's').format('hh:mm:ss'),
    },
    {
      title: 'Super Chat amount',
      content: (
        <>
          {video.totalPurchaseAmounts
            .sort((a, b) => b.totalPurchaseAmount - a.totalPurchaseAmount)
            .map(({ currencyUnit, totalPurchaseAmount }, i) => (
              <div key={i}>{currencyUnit + totalPurchaseAmount.toString()}</div>
            ))}
        </>
      ),
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

  return (
    <div className="max-w-screen-lg mx-auto py-8">
      <div className="youtube">
        <iframe src={`https://www.youtube.com/embed/${video.videoId}`}></iframe>
      </div>
      <div className="pl-1 pt-1">
        <h3 className="font-bold text-xl">{video.title}</h3>
        <div className="pt-2">
          <ExpandableTextView text={video.description} />
        </div>
      </div>
      <div className="w-full py-4">
        <span className="font-bold text-md ml-1">Overview</span>
        <PrettyTable items={overviewItems} />
      </div>
    </div>
  );
};
