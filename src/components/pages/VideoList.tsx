import React from 'react';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
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
              <Link to={`${match.url}/42`}>
                <span className="text-blue-600">Example Video</span>
              </Link>
            </li>
          </ul>
        </Route>
      </Switch>
    </>
  );
};
