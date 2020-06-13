import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const links = [
    {
      text: 'Channels',
      to: '/channels',
    },
    {
      text: 'Chats',
      to: '/chats',
    },
  ] as const;

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          Tubekids
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
          isExpanded ? 'block' : 'hidden'
        }`}
      >
        <div className="text-sm lg:flex-grow transition">
          {links.map(({ text, to }) => (
            <Link
              to={to}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              {text}
            </Link>
          ))}
        </div>
        <div>
          <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white mt-4 lg:mt-0">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};
