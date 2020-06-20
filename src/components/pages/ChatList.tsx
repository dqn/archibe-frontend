import React, { useState } from 'react';
import { GetChatsResponse, getChats, GetChatsParams } from '@/api/chats';
import { ChatViewer } from '../organisms/ChatViewer';

function parseQuery(query: string): GetChatsParams {
  const qArray: string[] = [];
  const params: GetChatsParams = {};

  query.split(/\s+/).forEach((word) => {
    if (word.startsWith('channel:')) {
      params.channelId = word.replace('channel:', '');
    } else if (word.startsWith('video:')) {
      params.videoId = word.replace('video:', '');
    } else {
      qArray.push(word);
    }
  });

  params.q = qArray.join(' ');

  return params;
}

export const ChatList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [chats, setChats] = useState<GetChatsResponse>([]);

  // To reset react-infinite-scroller's state.
  const [isSearching, setIsSearching] = useState(false);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChats([]);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 0);
  };

  const handleChatViewerScroll = async (offset: number, limit: number): Promise<number> => {
    const newChats = await getChats({ ...parseQuery(query), order: 'desc', offset, limit });
    setChats([...chats, ...newChats]);
    return newChats.length;
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
        {!isSearching && (
          <ChatViewer
            chats={chats}
            onScroll={handleChatViewerScroll}
            showChannelName
            showDatetime
          />
        )}
      </div>
    </>
  );
};
