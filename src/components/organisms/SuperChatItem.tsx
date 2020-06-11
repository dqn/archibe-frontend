import React from 'react';
import { ChatMessage } from '../molecules/ChatMessage';
import { SuperChat } from '@/types/models/chat';
import { Channel } from '@/types/models/channel';
import { formatPurchaseAmount } from '@/lib/youtube';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

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
  return (
    <div className="w-full max-w-sm">
      <div
        className="flex px-4 py-2 rounded-t"
        style={{
          backgroundColor: normalizeColor(chat.superChatContext.headerBackgroundColor),
          color: normalizeColor(chat.superChatContext.headerTextColor),
        }}
      >
        <img src={chat.channel.imageUrl} className="rounded-full w-10 h-10 inline" />
        <div className="w-full ml-4">
          <div>
            <Link to={`/channels/${chat.channel.channelId}`}>{chat.channel.name}</Link>
          </div>
          <div className="flex">
            <div className="w-1/3">
              {formatPurchaseAmount(chat.currencyUnit, chat.purchaseAmount)}
            </div>
            {(showOffsetTime || showDatetime) && (
              <div className="w-full text-xs text-right">
                <span>(</span>
                {showOffsetTime && <span>{chat.timestamp}</span>}
                {showOffsetTime && showDatetime && <span className="ml-2" />}
                {showDatetime && (
                  <Link to={`/videos/${chat.videoId}`}>
                    {dayjs.unix(chat.timestampUsec / 1_000_000).format('YYYY/MM/DD hh:mm')}
                  </Link>
                )}
                <span>)</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="px-4 py-2 rounded-b"
        style={{
          backgroundColor: normalizeColor(chat.superChatContext.bodyBackgroundColor),
          color: normalizeColor(chat.superChatContext.bodyTextColor),
        }}
      >
        <ChatMessage messageElements={chat.messageElements} />
      </div>
    </div>
  );
};
