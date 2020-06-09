import React from 'react';

export type Props = {
  href: string;
};

export const ExternalLink: React.FC<Props> = ({ href, children }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
