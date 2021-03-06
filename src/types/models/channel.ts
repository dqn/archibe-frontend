import { SuperChatAmountPerCurrencyUnit } from './chat';

export type Channel = {
  id: number;
  channelId: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  sentChatCount: number;
  receivedChatCount: number;
  sentSuperChats: SuperChatAmountPerCurrencyUnit[];
  receivedSuperChats: SuperChatAmountPerCurrencyUnit[];
};
