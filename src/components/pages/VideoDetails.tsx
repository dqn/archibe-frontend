import React, { useEffect, useState } from 'react';

// import ModeratorIcon from '@/assets/moderator.svg';
import { getVideo, GetVideoResponse } from '@/api/videos';
import { useParams } from 'react-router-dom';
// import { improveImageQuality } from '@/lib/youtube';
import { getChats, GetChatsResponse } from '@/api/chats';

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

  return <div className="max-w-screen-lg mx-auto py-12">{JSON.stringify(video)}</div>;
};
