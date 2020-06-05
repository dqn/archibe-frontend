import React, { useEffect, useState } from 'react';

import ModeratorIcon from '@/assets/moderator.svg';
import { getChannel, GetChannelResponse } from '@/api/channel';
import { useParams } from 'react-router-dom';

type MessageElement = MessageElementText | MessageElementEmoji;

type MessageElementText = {
  type: 'text';
  text: string;
};

type MessageElementEmoji = {
  type: 'emoji';
  label: string;
  url: string;
};

export const ChannelDetails: React.FC = () => {
  const { id } = useParams();

  const [channel, setChannel] = useState<GetChannelResponse>();

  useEffect(() => {
    (async () => {
      const channel = await getChannel(id);
      setChannel(channel);
      console.log(channel);
    })();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-12">
      <div className="flex">
        <img className="rounded-full w-32" src={channel?.imageUrl} />
        <div className="font-bold ml-8 mt-3 text-3xl">
          <div>{channel?.name}</div>
          <div className="flex">
            {channel?.badges?.map((badge, i) => (
              <img key={i} className="w-6" src={badge.imageUrl} alt={badge.label} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-8">
        <div className="w-full lg:w-1/2 lg:pr-8">
          <span className="font-bold text-md">Overview</span>
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className="w-1/2" />
                <th className="w-2/2" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">AAAAA</td>
                <td className="border px-4 py-2">BBBBB</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">XXXXX</td>
                <td className="border px-4 py-2">YYYYY</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">あああああ</td>
                <td className="border px-4 py-2">いいいいい</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
          <span className="font-bold text-md">Recent Chats</span>
          <ul className="text-sm">
            {[].map((_, i) => (
              <li key={i} className="flex border-t py-3">
                <img src={ModeratorIcon} className="w-5 h-5" />

                {[].map((me: MessageElement, i) => (
                  <div key={i}>
                    {me.type === 'text' ? (
                      <div className="flex items-center">{me.text}</div>
                    ) : (
                      <img className="w-5 h-5" src={me.url} alt={me.label} />
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
