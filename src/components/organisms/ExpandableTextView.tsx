import React, { useState } from 'react';

export type Props = {
  text: string;
  expanded?: boolean;
  lines?: number;
};

export const ExpandableTextView: React.FC<Props> = ({ text, expanded = false, lines = 2 }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const rows = text.split('\n');

  return (
    <>
      {rows.slice(0, lines).map((row, i) => (
        <div key={i}>{row ? <div>{row}</div> : <br />}</div>
      ))}
      {rows.length >= lines &&
        (isExpanded ? (
          <>
            {rows.slice(lines).map((row, i) => (
              <div key={i}>{row ? <div>{row}</div> : <br />}</div>
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
