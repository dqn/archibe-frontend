import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import dayjs from 'dayjs';
import { getChannel, GetChannelResponse } from '@/api/channels';
import { improveImageQuality } from '@/lib/youtube';
import { getChats, GetChatsResponse } from '@/api/chats';
import { PrettyTable, PrettyTableItem } from '../organisms/PrettyTable';
import { ExternalLink } from '../molecules/ExternalLink';
import { ChatList } from '../organisms/ChatList';

export const ChannelDetails: React.FC = () => {
  const { id } = useParams();

  const [channel, setChannel] = useState<GetChannelResponse>();
  const [chats, setChats] = useState<GetChatsResponse>([]);

  useEffect(() => {
    getChannel(id).then(setChannel);
  }, []);

  if (!channel) {
    return <></>;
  }

  const overviewItems: PrettyTableItem[] = [
    {
      title: 'Channel',
      content: (
        <ExternalLink href={`https://www.youtube.com/channel/${channel.channelId}`}>
          YouTube
        </ExternalLink>
      ),
    },
    {
      title: 'Sent chats',
      content: channel.sentChatCount,
    },
    {
      title: 'Recieved chats',
      content: channel.receivedChatCount,
    },
    {
      title: 'Updated at',
      content: dayjs(channel.updatedAt).format('YYYY/MM/DD hh:mm:ss'),
    },
  ];

  const onChatListScroll = (offset: number, limit: number): Promise<number> => {
    return getChats({ channelId: id, offset, limit, order: 'desc' }).then((newChats) => {
      setChats([...chats, ...newChats]);
      return newChats.length;
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto py-8">
      <div className="lg:flex">
        <div className="w-full lg:w-auto">
          <img
            className="rounded-full w-32 h-32 mx-auto"
            src={improveImageQuality(channel.imageUrl)}
          />
        </div>
        <div className="font-bold text-center mt-3 text-3xl mx-3 lg:ml-8">
          <div className="lg:text-left">{channel.name}</div>
          <div className="flex justify-center lg:justify-start">
            {channel.badges?.map((badge, i) => (
              <Tooltip key={i} title={badge.label}>
                <img src={badge.imageUrl} className="w-6 h-6" />
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-8">
        <div className="w-full">
          <span className="font-bold text-md ml-1">Overview</span>
          <PrettyTable items={overviewItems} />
        </div>
        <div className="w-full mt-6">
          <span className="font-bold text-md ml-1">Recent chats</span>
          <ChatList chats={chats} onScroll={onChatListScroll} showDatetime={true} />
        </div>
      </div>
    </div>
  );
};
