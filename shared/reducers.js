import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import playReducers from './reducers/Common/PlayReducers';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

const rootReducer = combineReducers({
  playStore: playReducers,
  router: routeReducer,
  reduxAsyncConnect
});

export default rootReducer;
