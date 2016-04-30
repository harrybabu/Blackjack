import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Play from './containers/Play';

export default () => {
  // console.log(store);
  return (
      <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/play/" component={Play} name="play" />
      </Route>
  );
};
