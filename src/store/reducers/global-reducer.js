// Core
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Custom
import appReducer from './app';
const containersReducer = {
  app: appReducer,
  // NOTE: put other app reducers here
};

const createGlobalReducer = injectedReducers => combineReducers({
  ...containersReducer,
  route: routerReducer,
  ...injectedReducers,
});

export default createGlobalReducer;
