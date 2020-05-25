import React from 'react';

import ModeratorIcon from '@/assets/moderator.svg';

type Chat = ChatElement[];

type ChatElement = ChatElementText | ChatElementEmoji;

type ChatElementText = {
  type: 'text';
  text: string;
};

type ChatElementEmoji = {
  type: 'emoji';
  label: string;
  url: string;
};

export const ChannelDetails: React.FC = () => {
  const chats: Chat[] = [
    [
      {
        type: 'emoji',
        label: ':ヘル絵文字:',
        url:
          'https://yt3.ggpht.com/bQwAyOOzbkmbspiiXmKTdtoAkk1moB-IoDm57tr-uxwsL--uwAp7pn-xwUeGxCKplxKLIUC8Tg=w48-h48-c-k-nd',
      },
      {
        type: 'emoji',
        label: ':エスタ:',
        url:
          'https://yt3.ggpht.com/_ry56RH1rcg82sn3dvYxqMDi2g6TUH-YTxCRZ3ri8QbJWV4yzYTY7OATB0-HyoeM5YKzDkfd4cQ=w48-h48-c-k-nd',
      },
      {
        type: 'emoji',
        label: ':スタート:',
        url:
          'https://yt3.ggpht.com/4_cdD5Lw9A-GiaQBz7Nqf740snE4gNRGlsMs_HczDQJh-WsOhNmAQu27r447Of0VSIaWH21qDA=w48-h48-c-k-nd',
      },
    ],
    [
      {
        type: 'text',
        text: 'ついえら',
      },
    ],
    [
      {
        type: 'emoji',
        label: ':ハロ絵文字:',
        url:
          'https://yt3.ggpht.com/uduV0nAMMUbllf2scSjK0U2gg6BdbPvJGOnn_UUoT2fzL2SXdUT6x0tXluIQSbd3ERcqVOSTpiU=w48-h48-c-k-nd',
      },
      {
        type: 'text',
        text: 'エスタ',
      },
    ],
  ];

  const channelName = 'DQN';
  const profileImageURL =
    'https://yt3.ggpht.com/-eeYG7UBY_r4/AAAAAAAAAAI/AAAAAAAAAAA/-NxFj-72uRE/s256-c-k-no-mo-rj-c0xffffff/photo.jpg';

  const badges = [
    {
      url:
        'https://yt3.ggpht.com/Wa-BFnHSYbrUshwtB1G7ka08OiLwmJ4-TR6NlR7TEwUtsZI8Fz_751JkprNPO9hMDSZkBannOw=s32-c-k',
    },
    {
      url:
        'https://yt3.ggpht.com/bjqNUwPSXZRToJ_skzbupyBHTgQbOA2Gw3Wv1cfPNErkcCLdGipQ-zGF36swoW6j8swHGp3hYw=s32-c-k',
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-12">
      <div className="flex">
        <img className="rounded-full w-32" src={profileImageURL} />
        <div className="font-bold ml-8 mt-3 text-3xl">
          <div>{channelName}</div>
          <div className="flex">
            {badges.map((badge, i) => (
              <img key={i} className="w-6" src={badge.url} />
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
            {chats.map((messages, i) => (
              <li key={i} className="flex border-t py-3">
                <img src={ModeratorIcon} className="w-5 h-5" />

                {messages.map((message: ChatElement, i) => (
                  <div key={i}>
                    {message.type === 'text' ? (
                      <div className="flex items-center">{message.text}</div>
                    ) : (
                      <img
                        className="w-5 h-5"
                        src={message.url}
                        alt={message.label}
                      />
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
