import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { syncHistory } from 'react-router-redux';

const storeBuilder = (reduxMiddleware) => {
  const middlewares = [thunkMiddleware, reduxMiddleware];

  // if (target === 'client') {
    /* enable redux state logging only on the client */
  if (__DEVELOPMENT__) {
    middlewares.push( createLogger() );
  }
  // }

  return compose(
    applyMiddleware(...middlewares)
  )(createStore);
};

export default function configureStore(history, initialState) {
  const reduxRouterMiddleware = syncHistory(history);
  const createWrappedStore = storeBuilder(reduxRouterMiddleware);
  return createWrappedStore(rootReducer, initialState);
}
