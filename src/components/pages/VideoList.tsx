import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import { VideoDetails } from './VideoDetails';

export const VideoList: React.FC = () => {
  const match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:id`} component={VideoDetails} />
        <Route exact path={match.path}>
          <ul>
            <li>
              <Link to={`${match.url}/42`} className="text-blue-600">
                Example Video
              </Link>
            </li>
          </ul>
        </Route>
      </Switch>
    </>
  );
};
