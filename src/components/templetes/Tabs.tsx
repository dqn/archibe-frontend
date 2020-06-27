import React, { useState } from 'react';

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
      <div className="flex justify-between bg-gray-900">
        {tabs.map((it) => (
          <div className="w-full flex" onClick={() => setTab(it.name)}>
            <div className="mx-auto mt-6">{it.name}</div>
          </div>
        ))}
      </div>
      <div className="tabcontent">{tabs.find((it) => it.name === tab)!.content}</div>
    </>
  );
};
