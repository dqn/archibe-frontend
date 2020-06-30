import { Badge } from '@/types/models/badge';
import { Channel } from '@/types/models/channel';
import { Video } from '@/types/models/video';

import { client } from './client';

export type GetChannelsParams = {
  q?: string;
  offset?: number;
  limit?: number;
};

export type GetChannelsResponse = (Pick<Channel, 'id' | 'channelId' | 'name' | 'imageUrl'> & {
  badges: Badge[];
})[];

export type GetChannelResponse = Channel & {
  badges: Badge[];
  videos: Video[];
};

export async function getChannels(params: GetChannelsParams = {}): Promise<GetChannelsResponse> {
  return (await client.get('/api/channels', { params })).data;
}

export async function getChannel(channelId: string): Promise<GetChannelResponse> {
  return (await client.get(`/api/channels/${channelId}`)).data;
}
