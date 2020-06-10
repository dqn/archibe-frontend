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
        <li key={i} className="border-t py-2 mx-2 my-auto">
          <div className="flex">
            <img src={chat.channel.imageUrl} className="rounded-full w-6 h-6" />
            <div className="ml-2">
              <span className="text-gray-600">{chat.timestamp}</span>
              <span className="ml-2 my-auto inline">
                <span className={isModerator(chat.badges) ? 'moderator' : 'text-gray-600'}>
                  {chat.channel.name}
                </span>
                {isModerator(chat.badges) && <img src={ModeratorIcon} className="w-5 h-5 inline" />}
                {chat.badges
                  ?.filter((badge) => badge.badgeType === 'member')
                  ?.map((badge) => (
                    <img src={badge.imageUrl} className="w-5 h-5 ml-1 inline" />
                  ))}
              </span>

              <div className="ml-2 inline">
                {chat.messageElements.map((me, i) => (
                  <span key={i} className="inline">
                    {me.type === 'text' ? (
                      <span className="text-gray-800">{me.text}</span>
                    ) : (
                      <img className="w-6 h-6 mx-1 inline" src={me.imageUrl} alt={me.label} />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
