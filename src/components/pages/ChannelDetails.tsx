import React, { useEffect, useState } from 'react';

import ModeratorIcon from '@/assets/moderator.svg';
import { getChannel, GetChannelResponse } from '@/api/channels';
import { useParams } from 'react-router-dom';
import { improveImageQuality } from '@/lib/youtube';
import { getChats, GetChatsResponse } from '@/api/chats';

export const ChannelDetails: React.FC = () => {
  const { id } = useParams();

  const [channel, setChannel] = useState<GetChannelResponse>();
  const [chats, setChats] = useState<GetChatsResponse>();

  useEffect(() => {
    getChannel(id).then(setChannel);
    getChats({ channelId: id }).then(setChats);
  }, []);

  if (!channel || !chats) {
    return <></>;
  }

  return (
    <div className="max-w-screen-lg mx-auto py-12">
      <div className="flex">
        <img className="rounded-full w-32" src={improveImageQuality(channel.imageUrl)} />
        <div className="font-bold ml-8 mt-3 text-3xl">
          <div>{channel.name}</div>
          <div className="flex">
            {channel.badges?.map((badge, i) => (
              <img key={i} className="w-6" src={badge.imageUrl} alt={badge.label} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-8">
        <div className="w-full">
          <span className="font-bold text-md ml-1">Overview</span>
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className="w-1/2" />
                <th className="w-2/2" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">Channel</td>
                <td className="border px-2 py-1">
                  <a href={`https://www.youtube.com/channel/${channel.channelId}`}>YouTube</a>
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-2 py-1">Sent chats</td>
                <td className="border px-2 py-1">{channel.sentChatCount}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">Recieved chats</td>
                <td className="border px-2 py-1">{channel.receivedChatCount}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">Updated at</td>
                <td className="border px-2 py-1">{channel.updatedAt}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full mt-6">
          <span className="font-bold text-md ml-1">Recent chats</span>
          <ul className="text-sm">
            {chats.map((chat, i) => (
              <li key={i} className="flex border-t py-3">
                <img src={chat.channel.imageUrl} className="w-6 h-6" />
                {chat.badges?.find((badge) => badge.badgeType === 'moderator') && (
                  <img src={ModeratorIcon} className="w-5 h-5" />
                )}

                {chat.messageElements.map((me, i) => (
                  <div key={i} className="ml-3">
                    {me.type === 'text' ? (
                      <div className="flex items-center">{me.text}</div>
                    ) : (
                      <img className="w-5 h-5" src={me.imageUrl} alt={me.label} />
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
