import { client } from './client';
import { Channel } from '@/types/models/channel';
import { Badge } from '@/types/models/badge';
import { Video } from '@/types/models/video';

export type GetChannelResponse = Channel & {
  badges?: Badge[];
  videos?: Video[];
};

export async function getChannel(channelId: string): Promise<GetChannelResponse> {
  return (await client.get(`/channels/${channelId}`)).data;
}
