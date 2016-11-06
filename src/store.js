import { createStore , applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import createLogger from 'redux-logger'

// import PouchMiddleware from 'pouch-redux-middleware'
import actions from './actions';
import deriva from './reducers';

/*
 * Create a redux store , a global state tree
 * to use with react components
 */
let logger = createLogger();
let store = createStore(deriva, compose(
  applyMiddleware(
    thunk,
    promise,
    logger
  ),
  ( window.devToolsExtension ? window.devToolsExtension() : f => f )
));

export default store;
