import { Channel } from './channel';
import { Badge } from './badge';

type BaseChat = {
  id: number;
  chatId: string;
  authorChannelId: string;
  videoId: string;
  timestamp: string;
  timestampUsec: string;
  messageElements: MessageElement[];
  createdAt: string;
  updatedAt: string;
  channel?: Channel;
  badges?: Badge[];
};

export type NormalChat = BaseChat & {
  type: 'chat';
};

export type SuperChat = BaseChat & {
  type: 'super_chat';
  purchaseAmount: number;
  currencyUnit: string;
  superChatContext: SuperChatContext;
};

export type Chat = NormalChat | SuperChat;

export type MessageElement = MessageElementText | MessageElementEmoji;

export type MessageElementText = {
  type: 'text';
  text: string;
};

export type MessageElementEmoji = {
  type: 'emoji';
  label: string;
  imageUrl: string;
};

export type SuperChatContext = {
  headerBackgroundColor: string;
  headerTextColor: string;
  bodyBackgroundColor: string;
  bodyTextColor: string;
  authorNameTextColor: string;
};