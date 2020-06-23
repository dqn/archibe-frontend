import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';
import ModeratorIcon from '@/assets/moderator.svg';
import { GetChatsResponse } from '@/api/chats';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../molecules/ChatMessage';
import { DiscolorableVerifiedIcon } from '../atoms/DiscolorableVerifiedIcon';

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

  const channelLink = <Link to={`/channels/${chat.channel.channelId}`}>{chat.channel.name}</Link>;

  return (
    <>
      <img src={chat.channel.imageUrl} className="rounded-full w-6 h-6" />
      <div className="ml-2">
        {showOffsetTime && <ChatTime>{chat.timestamp}</ChatTime>}
        {showDatetime && (
          <ChatTime className="ml-2">
            <Link to={`/videos/${chat.videoId}`}>
              {dayjs.unix(chat.timestampUsec / 1_000_000).format('YYYY/MM/DD HH:mm')}
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
        {isModerator && <img src={ModeratorIcon} className="w-5 h-5 inline" />}
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
