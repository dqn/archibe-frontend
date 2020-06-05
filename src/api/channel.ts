import { client } from './client';

export type GetChannelResponse = {
  id: number;
  channelId: string;
  name: string;
  imageUrl: string;
  sentChatCount: number;
  receivedChatCount: number;
  created_at: string;
  updated_at: string;
  badges: Badge[];
  videos: Video[];
};

export type Badge = {
  badgeType: string;
  imageUrl: string;
  label: string;
};

export type Video = {
  videoId: string;
};

export async function getChannel(channelId: string): Promise<GetChannelResponse> {
  return (await client.get(`/channels/${channelId}`)).data;
}
