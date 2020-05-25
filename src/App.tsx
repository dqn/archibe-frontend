import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Navigation } from './components/templetes/Navigation';
import { ChannelList } from './components/pages/ChannelList';

export const App: React.FC = () => {
  return (
    <Router>
      <Navigation />

      <Switch>
        <Route path="/channels" component={ChannelList} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};
