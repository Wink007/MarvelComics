import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history'; // eslint-disable-line
import createSagaMiddleware from 'redux-saga';

import createGlobalReducer from './reducers/global-reducer';
import globalSagas from './sagas/global-sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production'
  && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;
/* eslint-enable */

const middlewares = [
  // Middleware for intercepting and dispatching navigation actions
  routerMiddleware(history),
  sagaMiddleware,
];

const store = createStore(
  createGlobalReducer(),
  composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(globalSagas);

// Extensions
store.injectedReducers = {}; // Reducer registry

// Make reducers hot reloadable
if (module.hot) {
  module.hot.accept('./reducers/global-reducer', () => {
    store.replaceReducer(createGlobalReducer(store.injectedReducers));
  });
}

export default store;
