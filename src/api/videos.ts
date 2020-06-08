import { client } from './client';
import { Video } from '@/types/models/video';

export type GetVideoResponse = Video;

export async function getVideo(videoId: string): Promise<GetVideoResponse> {
  return (await client.get(`/videos/${videoId}`)).data;
}
