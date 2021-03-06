import { useState } from 'react';
import Linkify from 'react-linkify';

import { ExternalLink } from '../atoms/ExternalLink';

export type Props = {
  text: string;
  expanded?: boolean;
};

function preprocess(text: string): string {
  return text.replace(/([^\s])http/g, '$1 http');
}

export const ExpandableTextView: React.FC<Props> = ({ text, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const componentDecorator = (href: string, text: string, key: number) => (
    <span key={key}>
      <ExternalLink href={href}>{text}</ExternalLink>
    </span>
  );

  return (
    <>
      <div className={isExpanded ? 'whitespace-pre-line' : 'truncate'}>
        <Linkify componentDecorator={componentDecorator}>{preprocess(text)}</Linkify>
      </div>
      <div className="mt-6">
        <a onClick={() => setIsExpanded(!isExpanded)} className="link cursor-pointer">
          {isExpanded ? '一部を表示' : 'もっと見る'}
        </a>
      </div>
    </>
  );
};
