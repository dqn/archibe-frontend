import React, { useState } from 'react';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { ChannelDetails } from './ChannelDetails';
import { GetChannelsResponse, getChannels } from '@/api/channels';
import InfiniteScroll from 'react-infinite-scroller';

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
                    <li key={i} className="border-t py-2 mx-2 my-auto flex">
                      <img src={channel.imageUrl} />
                      <Link to={`${match.path}/${channel.channelId}`}>{channel.name}</Link>
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
