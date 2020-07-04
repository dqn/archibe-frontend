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

export function getVideos(params: GetVideosParams = {}): Promise<GetVideosResponse> {
  return client.get('/api/videos', { params });
}

export type GetVideoResponse = Video & {
  channel: Channel;
};

export function getVideo(videoId: string): Promise<GetVideoResponse> {
  return client.get(`/api/videos/${videoId}`);
}
