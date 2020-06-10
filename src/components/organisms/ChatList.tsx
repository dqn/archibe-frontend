import React from 'react';
import ModeratorIcon from '@/assets/moderator.svg';
import { GetChatsResponse } from '@/api/chats';
import { Badge } from '@/types/models/badge';

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
        <li key={i} className="flex border-t py-2">
          <img src={chat.channel.imageUrl} className="rounded-full w-6 h-6 mx-2" />
          <div className="my-auto">
            <span className="text-gray-600">{chat.channel.name}</span>
            {isModerator(chat.badges) && <img src={ModeratorIcon} className="w-5 h-5" />}
          </div>

          {chat.messageElements.map((me, i) => (
            <div key={i} className="ml-2 my-auto text-gray-800">
              {me.type === 'text' ? (
                <div className="flex">{me.text}</div>
              ) : (
                <img className="w-5 h-5" src={me.imageUrl} alt={me.label} />
              )}
            </div>
          ))}
        </li>
      ))}
    </ul>
  );
};
