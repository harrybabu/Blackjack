import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../shared/store';
import getRoutes from '../shared/routes';
import { Router, RouterContext, browserHistory } from 'react-router';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

const history = useScroll(() => browserHistory)();
const store = configureStore(history, window.__initial_state__);
const dest = document.getElementById('content');

const component = (
  <Router render={(props) =>
        <RouterContext {...props}/>
      } history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);


if (process.env.NODE_ENV !== 'production') {
  window.React = React;

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
