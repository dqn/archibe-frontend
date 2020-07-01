import dayjs from 'dayjs';
import Link from 'next/link';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';

import { GetChatsResponse } from '@/api/chats';
import ModeratorIcon from '@/assets/moderator.svg';

import { DiscolorableVerifiedIcon } from '../atoms/DiscolorableVerifiedIcon';
import { ChatMessage } from '../molecules/ChatMessage';

export type Props = {
  chat: GetChatsResponse[number];
  showChannelName?: boolean;
  showOffsetTime?: boolean;
  showDatetime?: boolean;
};

export const ChatItem: React.FC<Props> = ({
  chat,
  showChannelName = false,
  showOffsetTime = false,
  showDatetime = false,
}) => {
  let isMember = false;
  let isModerator = false;
  let isOwner = false;
  let isVerified = false;

  chat.badges.forEach((badge) => {
    switch (badge.badgeType) {
      case 'member': {
        isMember = true;
        break;
      }
      case 'moderator': {
        isModerator = true;
        break;
      }
      case 'owner': {
        isOwner = true;
        break;
      }
      case 'verified': {
        isVerified = true;
        break;
      }
      default: {
        break;
      }
    }
  });

  const channelLink = (
    <Link href={`/channels/${chat.channel.channelId}`}>
      <a>{chat.channel.name}</a>
    </Link>
  );

  return (
    <>
      <img src={chat.channel.imageUrl} className="rounded-full w-6 h-6" />
      <div className="ml-2">
        {showOffsetTime && <ChatTime>{chat.timestamp}</ChatTime>}
        {showDatetime && (
          <ChatTime className="ml-2">
            <Link href={`/videos/${chat.videoId}`}>
              <a>{dayjs.unix(chat.timestampUsec / 1_000_000).format('YYYY/MM/DD HH:mm')}</a>
            </Link>
          </ChatTime>
        )}
        {showChannelName && (
          <span className="ml-2">
            {isOwner ? (
              <span className="bg-owner p-1 text-black rounded-sm font-semibold">
                {channelLink}
              </span>
            ) : isModerator ? (
              <span className="text-moderator">{channelLink}</span>
            ) : isVerified ? (
              <ChannelNameVerified>
                {channelLink}
                <span className="ml-1">
                  <DiscolorableVerifiedIcon />
                </span>
              </ChannelNameVerified>
            ) : isMember ? (
              <ChannelNameMember>{channelLink}</ChannelNameMember>
            ) : (
              <ChannelNameNormal>{channelLink}</ChannelNameNormal>
            )}
          </span>
        )}
        {/* TODO: use url-loader? */}
        {isModerator && <ModeratorIcon className="w-5 h-5 inline" />}
        {chat.badges
          .filter((badge) => badge.badgeType === 'member')
          .map((badge, j) => (
            <Tooltip key={j} title={badge.label}>
              <img src={badge.imageUrl} className="w-5 h-5 ml-1 inline" />
            </Tooltip>
          ))}
        <span className="ml-2 chat-text">
          <ChatMessage messageElements={chat.messageElements} />
        </span>
      </div>
    </>
  );
};

const ChannelNameNormal = styled.span`
  color: ${({ theme }) => theme.chat.channelName.normalColor};
`;

const ChannelNameMember = styled.span`
  color: ${({ theme }) => theme.chat.channelName.memberColor};
`;

const ChannelNameVerified = styled.span`
  color: ${({ theme }) => theme.chat.channelName.verifiedColor};
  background-color: ${({ theme }) => theme.chat.channelName.verifiedBg};
`;

const ChatTime = styled.span`
  color: ${({ theme }) => theme.chat.timeColor};
`;
