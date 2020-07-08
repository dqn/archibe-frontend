import { GetChatsResponse } from '@/api/chats';

import { ItemsLoader } from '../templetes/ItemsLoader';
import { ChatItem } from './ChatItem';
import { SuperChatItem } from './SuperChatItem';

export type Props = {
  chats: GetChatsResponse;
  onScroll: (offset: number, limit: number) => Promise<number>;
  chatsPerPage?: number;
  showChannelName?: boolean;
  showOffsetTime?: boolean;
  showDatetime?: boolean;
};

export const ChatViewer: React.FC<Props> = ({
  chats,
  onScroll,
  chatsPerPage = 30,
  showChannelName = false,
  showOffsetTime = false,
  showDatetime = false,
}) => {
  return (
    <div className="text-sm">
      <ItemsLoader onClickLoadMore={onScroll} itemsPerPage={chatsPerPage}>
        {chats.map((chat, i) => (
          <div key={i} className="py-2 mx-2 my-auto flex">
            {chat.type === 'chat' ? (
              <ChatItem
                chat={chat}
                showChannelName={showChannelName}
                showOffsetTime={showOffsetTime}
                showDatetime={showDatetime}
              />
            ) : (
              <SuperChatItem
                chat={chat}
                showOffsetTime={showOffsetTime}
                showDatetime={showDatetime}
              />
            )}
          </div>
        ))}
      </ItemsLoader>
    </div>
  );
};
