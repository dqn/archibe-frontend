import { NextPage } from 'next';
import { useState } from 'react';

import { getVideos, GetVideosResponse } from '@/api/videos';
import { VideoList } from '@/components/organisms/VideoList';

type Props = {
  videos: GetVideosResponse;
};

const Home: NextPage<Props> = () => {
  const [videos, setVideos] = useState<GetVideosResponse>([]);

  const handleVideoListScroll = (offset: number, limit: number): Promise<number> => {
    return getVideos({ offset, limit, order: 'desc' }).then((newVideos) => {
      setVideos([...videos, ...newVideos]);
      return newVideos.length;
    });
  };

  return (
    <>
      <div className="w-full py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Archibe</h1>
          <span>Archibe web app for summarizing and browsing YouTube Live archives</span>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <div className="mt-4">
          <VideoList videos={videos} onScroll={handleVideoListScroll} />
        </div>
      </div>
    </>
  );
};

export default Home;
