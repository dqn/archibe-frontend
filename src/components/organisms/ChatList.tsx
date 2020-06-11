import React, { useState } from 'react';
import { GetChatsResponse } from '@/api/chats';
import InfiniteScroll from 'react-infinite-scroller';
import { ChatItem } from './ChatItem';

export type Props = {
  chats: GetChatsResponse;
  onScroll: (offset: number, limit: number) => Promise<number>;
  chatsPerPage?: number;
  showChannelName?: boolean;
  showOffsetTime?: boolean;
  showDatetime?: boolean;
};

export const ChatList: React.FC<Props> = ({
  chats,
  onScroll,
  chatsPerPage = 30,
  showChannelName = false,
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
        pageStart={-1}
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
            <ChatItem
              chat={chat}
              showChannelName={showChannelName}
              showOffsetTime={showOffsetTime}
              showDatetime={showDatetime}
            ></ChatItem>
          </li>
        ))}
      </InfiniteScroll>
    </ul>
  );
};