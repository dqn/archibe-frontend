import { Channel } from '@/types/models/channel';
import { Video } from '@/types/models/video';

import { client } from './client';

export type GetVideosParams = {
  q?: string;
  channelId?: string;
  order?: 'asc' | 'desc';
  offset?: number;
  limit?: number;
};

export type GetVideosResponse = (Video & {
  channel: Channel;
})[];

export async function getVideos(params: GetVideosParams): Promise<GetVideosResponse> {
  return (await client.get('/videos', { params })).data;
}

export type GetVideoResponse = Video & {
  channel: Channel;
};

export async function getVideo(videoId: string): Promise<GetVideoResponse> {
  return (await client.get(`/videos/${videoId}`)).data;
}
