import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

import { formatPurchaseAmount } from '@/lib/youtube';
import { Channel } from '@/types/models/channel';
import { SuperChat } from '@/types/models/chat';

import { ChatMessage } from '../molecules/ChatMessage';

export type Props = {
  chat: SuperChat & { channel: Channel };
  showOffsetTime?: boolean;
  showDatetime?: boolean;
};

function normalizeColor(color: string): string {
  return '#' + color.slice(2);
}

export const SuperChatItem: React.FC<Props> = ({
  chat,
  showOffsetTime = false,
  showDatetime = false,
}) => {
  const isSilent = !chat.messageElements.length;

  return (
    <div className="w-full max-w-sm">
      <div
        className={`flex px-4 py-2 ${isSilent ? 'rounded' : 'rounded-t'}`}
        style={{
          backgroundColor: normalizeColor(chat.superChatContext.headerBackgroundColor),
          color: normalizeColor(chat.superChatContext.headerTextColor),
        }}
      >
        <img src={chat.channel.imageUrl} className="rounded-full w-10 h-10 inline" />
        <div className="w-full ml-4">
          <div>
            <Link href={`/channels/${chat.channel.channelId}`}>
              <a>{chat.channel.name}</a>
            </Link>
          </div>
          <div className="flex">
            <div className="w-1/3">
              {formatPurchaseAmount(chat.currencyUnit, chat.purchaseAmount)}
            </div>
            <div className="w-full text-xs text-right">
              {showOffsetTime && <span>{chat.timestamp}</span>}
              {showDatetime && (
                <Link href={`/videos/${chat.videoId}`}>
                  <a>{dayjs.unix(chat.timestampUsec / 1_000_000).format('YYYY/MM/DD HH:mm')}</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isSilent && (
        <div
          className="px-4 py-2 rounded-b"
          style={{
            backgroundColor: normalizeColor(chat.superChatContext.bodyBackgroundColor),
            color: normalizeColor(chat.superChatContext.bodyTextColor),
          }}
        >
          <ChatMessage messageElements={chat.messageElements} />
        </div>
      )}
    </div>
  );
};
