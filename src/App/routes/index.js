import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './NotFound';
import Home from './Home/container/HomeContainer.js';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
);
