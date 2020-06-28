import dayjs from 'dayjs';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { GetVideosResponse } from '@/api/videos';

export type Props = {
  videos: GetVideosResponse;
  onScroll: (offset: number, limit: number) => Promise<number>;
  videosPerPage?: number;
};

export const VideoList: React.FC<Props> = ({ videos, onScroll, videosPerPage = 30 }) => {
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

  const loadMore = (page: number) => {
    onScroll(page * videosPerPage, videosPerPage).then((count) => {
      !count && setHasMore(false);
    });
  };

  return (
    <InfiniteScroll
      pageStart={-1}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      <div className="flex flex-wrap">
        {videos.map((video, i) => (
          <div key={i} className="w-full lg:w-1/4 flex flex-wrap lg:px-2 mb-2">
            <div
              className="w-1/2 lg:w-full relative cursor-pointer"
              onClick={() => history.push(`/videos/${video.videoId}`)}
            >
              <img src={video.thumbnailUrl} />
              <div className="opacity-75 bg-black text-xs text-white absolute right-0 bottom-0 px-1 m-1 rounded">
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
    </InfiniteScroll>
  );
};

const VideoTitle = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
