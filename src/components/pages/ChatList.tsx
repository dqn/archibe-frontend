import React, { useState } from 'react';
import { GetChatsResponse, getChats } from '@/api/chats';
import { ChatViewer } from '../organisms/ChatViewer';

export const ChatList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [chats, setChats] = useState<GetChatsResponse>([]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    getChats({ q: query, order: 'desc' }).then(setChats);
    event.preventDefault();
  };

  const handleChatViewerScroll = (offset: number, limit: number): Promise<number> => {
    return getChats({ q: query, order: 'desc', offset, limit }).then((newChats) => {
      setChats([...chats, ...newChats]);
      return newChats.length;
    });
  };

  return (
    <>
      <div className="max-w-screen-md mx-auto py-1">
        <form onSubmit={handleSubmit} className="flex items-center my-2 w-full px-1">
          <input
            onChange={handleQueryChange}
            className="border border-gray-500 rounded-full w-full px-4 h-8"
          />
        </form>
        <span className="font-bold text-md ml-1">Recent chats</span>
        <ChatViewer
          chats={chats}
          onScroll={handleChatViewerScroll}
          showChannelName={true}
          showDatetime={true}
        />
      </div>
    </>
  );
};
