import React, { useEffect, useState } from 'react';

// import ModeratorIcon from '@/assets/moderator.svg';
import { getVideo, GetVideoResponse } from '@/api/videos';
import { useParams } from 'react-router-dom';
// import { improveImageQuality } from '@/lib/youtube';
import { getChats, GetChatsResponse } from '@/api/chats';
import { PrettyTableItem, PrettyTable } from '../organisms/PrettyTable';

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
      title: 'Video',
      content: video.videoId,
    },
    {
      title: 'Channel ID',
      content: video.channelId,
    },
    {
      title: 'Title',
      content: video.title,
    },
    {
      title: 'Description',
      content: video.description,
    },
    {
      title: 'Length seconds',
      content: video.lengthSeconds,
    },
    {
      title: 'View count',
      content: video.viewCount,
    },
    {
      title: 'Average rating',
      content: video.averageRating,
    },
    {
      title: 'Thumbnail URL',
      content: video.thumbnailUrl,
    },
    {
      title: 'Category',
      content: video.category,
    },
    {
      title: 'Private',
      content: video.isPrivate ? 'private' : 'public',
    },
    {
      title: 'Publish date',
      content: video.publishDate,
    },
    {
      title: 'Upload date',
      content: video.uploadDate,
    },
    {
      title: 'Live started at',
      content: video.liveStartedAt,
    },
    {
      title: 'Live ended at',
      content: video.liveEndedAt,
    },
    {
      title: 'Created at',
      content: video.createdAt,
    },
    {
      title: 'Updated at',
      content: video.updatedAt,
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto py-12">
      <div className="flex flex-wrap mt-8">
        <div className="w-full">
          <span className="font-bold text-md ml-1">Overview</span>
          <PrettyTable items={overviewItems} />
        </div>
      </div>
    </div>
  );
};
