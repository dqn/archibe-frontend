import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Navigation } from './components/templetes/Navigation';

export const App: React.FC = () => {
  return (
    <>
      <Navigation />

      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <div>this is about page</div>
          </Route>
          <Route>
            <div>404 Not Found</div>
          </Route>
        </Switch>
      </Router>
    </>
  );
};
