import React from 'react';
import { MessageElement } from '@/types/models/chat';
import { Tooltip } from 'react-tippy';

export type Props = {
  messageElements: MessageElement[];
};

export const ChatMessage: React.FC<Props> = ({ messageElements }) => {
  return (
    <>
      {messageElements.map((me, i) => (
        <span key={i}>
          {me.type === 'text' ? (
            <span>{me.text}</span>
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
