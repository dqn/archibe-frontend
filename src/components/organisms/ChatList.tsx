import React, { useState } from 'react';
import dayjs from 'dayjs';
import ModeratorIcon from '@/assets/moderator.svg';
import { GetChatsResponse } from '@/api/chats';
import { Badge } from '@/types/models/badge';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../molecules/ChatMessage';
import InfiniteScroll from 'react-infinite-scroller';

export type Props = {
  chats: GetChatsResponse;
  onScroll: (offset: number, limit: number) => Promise<number>;
  chatsPerPage?: number;
  showChannelName?: boolean;
  showVideoId?: boolean;
  showOffsetTime?: boolean;
  showDatetime?: boolean;
};

function isModerator(badges: undefined | Badge[]): boolean {
  return !!badges && badges.some((badge) => badge.badgeType === 'moderator');
}

export const ChatList: React.FC<Props> = ({
  chats,
  onScroll,
  chatsPerPage = 30,
  showChannelName = false,
  showVideoId = false,
  showOffsetTime = false,
  showDatetime = false,
}) => {
  const [hasMore, setHasMore] = useState(true);

  const loadMore = (page: number) => {
    onScroll(page * chatsPerPage, chatsPerPage).then((count) => {
      !count && setHasMore(false);
    });
  };

  return (
    <ul className="text-sm">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {chats.map((chat, i) => (
          <li key={i} className="border-t py-2 mx-2 my-auto flex">
            <img src={chat.channel.imageUrl} className="rounded-full w-6 h-6" />
            <div className="ml-2">
              {showOffsetTime && <span className="text-gray-600">{chat.timestamp}</span>}
              {showDatetime && (
                <span className="ml-2 text-gray-600">
                  {dayjs.unix(chat.timestampUsec / 1_000_000).format('YYYY/MM/DD hh:mm:ss')}
                </span>
              )}
              {showVideoId && (
                <span className="ml-2">
                  <Link to={`/videos/${chat.videoId}`}>
                    <span className="text-gray-600">{chat.videoId}</span>
                  </Link>
                </span>
              )}
              {showChannelName && (
                <span className="ml-2">
                  <Link to={`/channels/${chat.channel.channelId}`}>
                    <span className={isModerator(chat.badges) ? 'moderator' : 'text-gray-600'}>
                      {chat.channel.name}
                    </span>
                  </Link>
                </span>
              )}
              {isModerator(chat.badges) && <img src={ModeratorIcon} className="w-5 h-5 inline" />}
              {chat.badges
                ?.filter((badge) => badge.badgeType === 'member')
                ?.map((badge, j) => (
                  <img key={j} src={badge.imageUrl} className="w-5 h-5 ml-1 inline" />
                ))}
              <span className="ml-2">
                <ChatMessage messageElements={chat.messageElements} />
              </span>
            </div>
          </li>
        ))}
      </InfiniteScroll>
    </ul>
  );
};
