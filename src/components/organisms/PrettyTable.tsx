import React from 'react';

export type Props = {
  items: PrettyTableItem[];
};

export type PrettyTableItem = {
  title: string;
  content: JSX.Element | string | number;
};

export const PrettyTable: React.FC<Props> = ({ items }) => {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <th className="w-1/2" />
          <th className="w-2/2" />
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i} className="even:bg-gray-100">
            <td className="border px-2 py-1">{item.title}</td>
            <td className="border px-2 py-1">{item.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
