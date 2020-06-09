import React, { useState } from 'react';
import Linkify from 'react-linkify';

export type Props = {
  text: string;
  expanded?: boolean;
};

export const ExpandableTextView: React.FC<Props> = ({ text, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const componentDecorator = (href: string, text: string, key: number) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );

  return (
    <>
      <div className={`whitespace-pre-line ${isExpanded ? '' : 'truncate'}`}>
        <Linkify componentDecorator={componentDecorator}>{text}</Linkify>
      </div>
      <div className="mt-3">
        {isExpanded ? (
          <a onClick={() => setIsExpanded(false)}>show less</a>
        ) : (
          <a onClick={() => setIsExpanded(true)}>show more</a>
        )}
      </div>
    </>
  );
};
