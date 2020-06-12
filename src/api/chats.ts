import { client } from './client';
import { Channel } from '@/types/models/channel';
import { Chat } from '@/types/models/chat';
import { Badge } from '@/types/models/badge';
import { Video } from '@/types/models/video';

export type GetChatsParams = {
  channelId?: string;
  videoId?: string;
  order?: 'asc' | 'desc';
  offset?: number;
  limit?: number;
};

export type GetChatsResponse = (Chat & {
  channel: Channel;
  video: Video;
  badges?: Badge[];
})[];

export async function getChats(params: GetChatsParams): Promise<GetChatsResponse> {
  return (await client.get('/chats', { params })).data;
}
