import { client } from './client';
import { Video } from '@/types/models/video';
import { Channel } from '@/types/models/channel';

export type GetVideoResponse = Video & {
  channel: Channel;
};

export async function getVideo(videoId: string): Promise<GetVideoResponse> {
  return (await client.get(`/videos/${videoId}`)).data;
}
