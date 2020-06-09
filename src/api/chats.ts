import { client } from './client';
import { Channel } from '@/types/models/channel';
import { Chat } from '@/types/models/chat';
import { Badge } from '@/types/models/badge';

export type GetChatsParams = {
  channelId?: string;
  offset?: number;
  limit?: number;
};

export type GetChatsResponse = (Chat & {
  channel: Channel;
  badges?: Badge[];
})[];

export async function getChats(params: GetChatsParams): Promise<GetChatsResponse> {
  return (await client.get('/chats', { params })).data;
}
