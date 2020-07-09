import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import { getChats, GetChatsResponse } from '@/api/chats';
import { getVideo, GetVideoResponse, getVideos, GetVideosResponse } from '@/api/videos';
import { ExternalLink } from '@/components/atoms/ExternalLink';
import { SuperChats } from '@/components/molecules/SuperChats';
import { ChatViewer } from '@/components/organisms/ChatViewer';
import { ExpandableTextView } from '@/components/organisms/ExpandableTextView';
import { PrettyTable, PrettyTableItem } from '@/components/organisms/PrettyTable';

type Props = {
  video: GetVideoResponse;
};

type Params = {
  id: string;
};

export const VideoDetails: NextPage<Props, Params> = ({ video }) => {
  const router = useRouter();
  const [chats, setChats] = useState<GetChatsResponse>([]);

  const id = router.query.id as string;

  const overviewItems: Readonly<PrettyTableItem>[] = [
    {
      title: 'Video ID',
      content: (
        <>
          <span>{video.videoId}</span> (
          <ExternalLink href={`https://www.youtube.com/watch?v=${video.videoId}`}>
            YouTube
          </ExternalLink>
          )
        </>
      ),
    },
    {
      title: 'チャンネル',
      content: (
        <Link href={`/channels/${video.channel.channelId}`}>
          <a className="link">{video.channel.name}</a>
        </Link>
      ),
    },
    {
      title: '配信開始日時',
      content: dayjs(video.liveStartedAt).format('YYYY/MM/DD HH:mm:ss'),
    },
    {
      title: '配信終了日時',
      content: dayjs(video.liveEndedAt).format('YYYY/MM/DD HH:mm:ss'),
    },
    {
      title: '配信時間',
      content: dayjs()
        .startOf('day')
        .add(video.lengthSeconds, 's')
        .format(video.lengthSeconds < 3600 ? 'mm:ss' : 'H:mm:ss'),
    },
    {
      title: 'スーパーチャット',
      content: <SuperChats superChats={video.receivedSuperChats} />,
    },
  ];

  const handleChatViewerScroll = (offset: number, limit: number): Promise<number> => {
    return getChats({ videoId: id, offset, limit }).then((newChats) => {
      setChats([...chats, ...newChats]);
      return newChats.length;
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto py-8">
      <div className="sticky top-0 lg:relative lg:top-auto">
        <YouTubeWrapper>
          <iframe
            className="absolute top-0 right-0 bottom-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.videoId}`}
          />
        </YouTubeWrapper>
      </div>
      <div className="pl-1 pt-1">
        <h3 className="font-bold text-xl">{video.title}</h3>
        <div className="pt-2">
          <ExpandableTextView text={video.description} />
        </div>
      </div>
      <div className="w-full pt-4">
        <PrettyTable items={overviewItems} />
      </div>
      <div className="pt-4">
        <ChatViewer
          chats={chats}
          onScroll={handleChatViewerScroll}
          showChannelName
          showOffsetTime
        />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const size = 1000;
  let page = 0;
  const videos: GetVideosResponse = [];

  while (true) {
    const data = await getVideos({ offset: size * page, limit: size });
    if (!data.length) {
      break;
    }

    videos.push(...data);
    page++;
  }

  const paths = videos.map((video) => `/videos/${video.videoId}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  if (!params?.id) throw new TypeError('ID is required.');

  const video = await getVideo(params.id);
  return { props: { video } };
};

const YouTubeWrapper = styled.div`
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  position: relative;
`;

export default VideoDetails;
