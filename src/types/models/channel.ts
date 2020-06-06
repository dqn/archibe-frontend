import { Badge } from './badge';
import { Video } from './video';

export type Channel = {
  id: number;
  channelId: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  sentChatCount: number;
  receivedChatCount: number;
  badges?: Badge[];
  videos?: Video[];
};
