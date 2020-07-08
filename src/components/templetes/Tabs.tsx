import { useState } from 'react';

type Props = {
  tabs: { name: string; content: JSX.Element }[];
  defaultTabName?: string;
};

export const Tabs: React.FC<Props> = ({ tabs, defaultTabName }) => {
  if (!tabs.length) {
    return <></>;
  }

  const [tab, setTab] = useState(defaultTabName ?? tabs[0].name);

  return (
    <>
      <div className="flex justify-between">
        {tabs.map((it, i) => (
          <div
            key={i}
            className={`w-full flex py-3 cursor-pointer ${
              it.name === tab && 'border-b-4 font-semibold'
            }`}
            onClick={() => setTab(it.name)}
          >
            <div className="mx-auto">{it.name}</div>
          </div>
        ))}
      </div>
      <div className="tabcontent">
        {tabs.map((it) => (
          <div className={it.name === tab ? '' : 'hidden'}>{it.content}</div>
        ))}
      </div>
    </>
  );
};
