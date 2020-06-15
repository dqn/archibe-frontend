import { client } from './client';
import { Channel } from '@/types/models/channel';
import { Badge } from '@/types/models/badge';
import { Video } from '@/types/models/video';

export type GetChannelsParams = {
  q?: string;
  offset?: number;
  limit?: number;
};

export type GetChannelsResponse = Pick<Channel, 'id' | 'channelId' | 'name' | 'imageUrl'>[];

export type GetChannelResponse = Channel & {
  badges?: Badge[];
  videos?: Video[];
};

export async function getChannels(params: GetChannelsParams): Promise<GetChannelsResponse> {
  return (await client.get('/channels', { params })).data;
}

export async function getChannel(channelId: string): Promise<GetChannelResponse> {
  return (await client.get(`/channels/${channelId}`)).data;
}
