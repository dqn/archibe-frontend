import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Tooltip } from 'react-tippy';

import { getChannels, GetChannelsResponse } from '@/api/channels';
import { improveImageQuality } from '@/lib/youtube';

import { ChannelDetails } from './ChannelDetails';

export const ChannelList: React.FC = () => {
  const match = useRouteMatch();
  const [q, setQ] = useState('');
  const [channels, setChannels] = useState<GetChannelsResponse>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQ(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChannels([]);
    setHasMore(true);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 0);
  };

  const handleChannelsViewerScroll = (page: number) => {
    const ChannelsPerPage = 30;
    const offset = page * ChannelsPerPage;
    const limit = ChannelsPerPage;
    getChannels({ q, offset, limit }).then((newChannels) => {
      setChannels([...channels, ...newChannels]);
      if (!newChannels.length) {
        setHasMore(false);
      }
    });
  };

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:id`} component={ChannelDetails} />
        <Route exact path={match.path}>
          <div className="max-w-screen-md mx-auto py-1">
            <form onSubmit={handleSubmit} className="flex items-center my-2 w-full px-1">
              <input
                onChange={handleQueryChange}
                className="border border-gray-500 rounded-full w-full px-4 h-8"
              />
            </form>
            <ul className="text-sm">
              {!isSearching && (
                <InfiniteScroll
                  pageStart={-1}
                  loadMore={handleChannelsViewerScroll}
                  hasMore={hasMore}
                  loader={
                    <div className="loader" key={0}>
                      Loading ...
                    </div>
                  }
                >
                  {channels.map((channel, i) => (
                    <li key={i} className="border rounded flex m-2 p-2">
                      <img
                        src={improveImageQuality(channel.imageUrl)}
                        className="rounded-full w-16 h-16"
                      />
                      <div className="ml-2 flex items-center">
                        <div>
                          <Link to={`${match.path}/${channel.channelId}`} className="text-md">
                            {channel.name}
                          </Link>
                          <div className="mt-2">
                            {channel.badges.map((badge, i) => (
                              <Tooltip key={i} title={badge.label}>
                                <img src={badge.imageUrl} className="w-6 h-6" />
                              </Tooltip>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </InfiniteScroll>
              )}
            </ul>
          </div>
        </Route>
      </Switch>
    </>
  );
};
