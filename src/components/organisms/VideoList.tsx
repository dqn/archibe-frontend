import dayjs from 'dayjs';
import Link from 'next/link';
import styled from 'styled-components';

import { GetVideosResponse } from '@/api/videos';

import { ItemsLoader } from '../templetes/ItemsLoader';

export type Props = {
  videos: GetVideosResponse;
  onScroll: (offset: number, limit: number) => Promise<number>;
  videosPerPage?: number;
};

export const VideoList: React.FC<Props> = ({ videos, onScroll, videosPerPage = 30 }) => {
  return (
    <ItemsLoader onClickLoadMore={onScroll} itemsPerPage={videosPerPage}>
      <div className="flex flex-wrap">
        {videos.map((video, i) => (
          <div key={i} className="w-full lg:w-1/4 flex flex-wrap lg:px-2 mb-2">
            <Link href={`/videos/${video.videoId}`}>
              <a className="w-1/2 lg:w-full relative cursor-pointer">
                <img src={video.thumbnailUrl} />
                <div className="opacity-75 bg-black text-xs text-white absolute right-0 bottom-0 px-1 m-1 rounded">
                  {dayjs()
                    .startOf('day')
                    .add(video.lengthSeconds, 's')
                    .format(video.lengthSeconds < 3600 ? 'mm:ss' : 'H:mm:ss')}
                </div>
              </a>
            </Link>
            <div className="w-1/2 lg:w-full pl-1 lg:pl-0 text-sm">
              <Link href={`/videos/${video.videoId}`}>
                <VideoTitle>{video.title}</VideoTitle>
              </Link>
              <div className="mt-1">{dayjs(video.publishDate).format('YYYY/MM/DD')}</div>
            </div>
          </div>
        ))}
      </div>
    </ItemsLoader>
  );
};

const VideoTitle = styled.a`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: pointer;
`;
