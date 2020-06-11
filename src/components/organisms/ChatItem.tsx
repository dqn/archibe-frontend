import React from 'react';
import dayjs from 'dayjs';
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
        {showOffsetTime && <span className="text-gray-600">{chat.timestamp}</span>}
        {showDatetime && (
          <span className="ml-2">
            <Link to={`/videos/${chat.videoId}`}>
              <span className="text-gray-600">
                {dayjs.unix(chat.timestampUsec / 1_000_000).format('YYYY/MM/DD hh:mm')}
              </span>
            </Link>
          </span>
        )}
        {showChannelName && (
          <span className="ml-2">
            <Link to={`/channels/${chat.channel.channelId}`}>
              <span
                className={
                  isModerator ? 'moderator-color' : isMember ? 'member-color' : 'text-gray-600'
                }
              >
                {chat.channel.name}
              </span>
            </Link>
          </span>
        )}
        {isModerator && <img src={ModeratorIcon} className="w-5 h-5 inline" />}
        {chat.badges
          ?.filter((badge) => badge.badgeType === 'member')
          ?.map((badge, j) => (
            <img key={j} src={badge.imageUrl} className="w-5 h-5 ml-1 inline" />
          ))}
        <span className="ml-2">
          <ChatMessage messageElements={chat.messageElements} />
        </span>
      </div>
    </>
  );
};
