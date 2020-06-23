import { Channel } from '@/types/models/channel';
import { Video } from '@/types/models/video';

import { client } from './client';

export type GetVideoResponse = Video & {
  channel: Channel;
};

export async function getVideo(videoId: string): Promise<GetVideoResponse> {
  return (await client.get(`/videos/${videoId}`)).data;
}
