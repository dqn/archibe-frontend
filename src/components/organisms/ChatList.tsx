import React from 'react';
import ModeratorIcon from '@/assets/moderator.svg';
import { GetChatsResponse } from '@/api/chats';
import { Badge } from '@/types/models/badge';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../molecules/ChatMessage';

export type Props = {
  chats: GetChatsResponse;
};

function isModerator(badges: undefined | Badge[]): boolean {
  return !!badges && badges.some((badge) => badge.badgeType === 'moderator');
}

export const ChatList: React.FC<Props> = ({ chats }) => {
  return (
    <ul className="text-sm">
      {chats.map((chat, i) => (
        <li key={i} className="border-t py-2 mx-2 my-auto flex">
          <img src={chat.channel.imageUrl} className="rounded-full w-6 h-6" />
          <div className="ml-2">
            <span className="text-gray-600">{chat.timestamp}</span>
            <span className="ml-2 my-auto">
              <Link to={`/channels/${chat.channel.channelId}`}>
                <span className={isModerator(chat.badges) ? 'moderator' : 'text-gray-600'}>
                  {chat.channel.name}
                </span>
              </Link>
              {isModerator(chat.badges) && <img src={ModeratorIcon} className="w-5 h-5 inline" />}
              {chat.badges
                ?.filter((badge) => badge.badgeType === 'member')
                ?.map((badge, j) => (
                  <img key={j} src={badge.imageUrl} className="w-5 h-5 ml-1 inline" />
                ))}
            </span>
            <span className="ml-2">
              <ChatMessage messageElements={chat.messageElements} />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
