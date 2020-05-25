import React from 'react';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { ChannelDetails } from './ChannelDetails';

export const ChannelList: React.FC = () => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:id`} component={ChannelDetails} />
        <Route exact path={match.path}>
          <ul>
            <li>
              <Link to={`${match.url}/42`}>
                <span className="text-blue-600">Example Channel</span>
              </Link>
            </li>
          </ul>
        </Route>
      </Switch>
    </>
  );
};
