import React from 'react';
import { Tooltip } from 'react-tippy';
import styled from 'styled-components';

import { MessageElement } from '@/types/models/chat';

export type Props = {
  messageElements: MessageElement[];
};

export const ChatMessage: React.FC<Props> = ({ messageElements }) => {
  return (
    <>
      {messageElements.map((me, i) => (
        <span key={i}>
          {me.type === 'text' ? (
            <ChatText>{me.text}</ChatText>
          ) : (
            <Tooltip title={me.label}>
              <img className="w-6 h-6 mx-1 inline" src={me.imageUrl} />
            </Tooltip>
          )}
        </span>
      ))}
    </>
  );
};

const ChatText = styled.span`
  color: ${({ theme }) => theme.chat.textColor};
`;
