import dayjs from 'dayjs';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Video } from '@/types/models/video';

export type Props = {
  videos: Video[];
};

export const VideoList: React.FC<Props> = ({ videos }) => {
  const history = useHistory();

  return (
    <div className="flex flex-wrap">
      {videos.map((video, i) => (
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
  );
};

const VideoTitle = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
