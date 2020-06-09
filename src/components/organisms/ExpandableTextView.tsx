import React, { useState } from 'react';

export type Props = {
  text: string;
  expanded?: boolean;
  lineCount?: number;
};

export const ExpandableTextView: React.FC<Props> = ({ text, expanded = false, lineCount = 2 }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const lines = text.split('\n');

  return (
    <>
      {lines.slice(0, lineCount).map((line, i) => (
        <div key={i}>{line ? <div>{line}</div> : <br />}</div>
      ))}
      {lines.length >= lineCount &&
        (isExpanded ? (
          <>
            {lines.slice(lineCount).map((line, i) => (
              <div key={i}>{line ? <div>{line}</div> : <br />}</div>
            ))}
            <div className="mt-4" />
            <a onClick={() => setIsExpanded(false)}>show less</a>
          </>
        ) : (
          <a className="mt-3" onClick={() => setIsExpanded(true)}>
            show more
          </a>
        ))}
    </>
  );
};
