import React from 'react';
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
            <span className="text-gray-800">{me.text}</span>
          ) : (
            <img className="w-6 h-6 mx-1 inline" src={me.imageUrl} alt={me.label} />
          )}
        </span>
      ))}
    </>
  );
};
