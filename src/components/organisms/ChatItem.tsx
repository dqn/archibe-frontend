import React from 'react';
import dayjs from 'dayjs';
import { Tooltip } from 'react-tippy';
import ModeratorIcon from '@/assets/moderator.svg';
import { GetChatsResponse } from '@/api/chats';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../molecules/ChatMessage';

export type Props = {
  chat: GetChatsResponse[number];
  showChannelName?: boolean;
  showOffsetTime?: boolean;
  showDatetime?: boolean;
};

export const ChatItem: React.FC<Props> = ({
  chat,
  showChannelName = false,
  showOffsetTime = false,
  showDatetime = false,
}) => {
  const isOwner = chat.authorChannelId === chat.video.channelId;
  let isMember = false;
  let isModerator = false;

  chat.badges?.forEach((badge) => {
    switch (badge.badgeType) {
      case 'member': {
        isMember = true;
        break;
      }
      case 'moderator': {
        isModerator = true;
        break;
      }
      default: {
        break;
      }
    }
  });

  return (
    <>
      <img src={chat.channel.imageUrl} className="rounded-full w-6 h-6" />
      <div className="ml-2">
        {showOffsetTime && <span className="chat-time">{chat.timestamp}</span>}
        {showDatetime && (
          <span className="ml-2">
            <Link to={`/videos/${chat.videoId}`} className="chat-time">
              {dayjs.unix(chat.timestampUsec / 1_000_000).format('YYYY/MM/DD HH:mm')}
            </Link>
          </span>
        )}
        {showChannelName && (
          <span
            className={`ml-2 ${
              isOwner
                ? 'owner-channel-name'
                : isModerator
                ? 'moderator-color'
                : isMember
                ? 'chat-member-color'
                : 'chat-channel-name'
            }`}
          >
            <Link to={`/channels/${chat.channel.channelId}`}>{chat.channel.name}</Link>
          </span>
        )}
        {isModerator && <img src={ModeratorIcon} className="w-5 h-5 inline" />}
        {chat.badges
          ?.filter((badge) => badge.badgeType === 'member')
          ?.map((badge, j) => (
            <Tooltip key={j} title={badge.label}>
              <img src={badge.imageUrl} className="w-5 h-5 ml-1 inline" />
            </Tooltip>
          ))}
        <span className="ml-2 chat-text">
          <ChatMessage messageElements={chat.messageElements} />
        </span>
      </div>
    </>
  );
};
