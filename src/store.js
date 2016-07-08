import { createStore , applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import PouchMiddleware from 'pouch-redux-middleware'
import PouchSync from 'pouch-websocket-sync'

import actions from './actions';
import deriva from './reducers';

const loggerMiddleware = createLogger()

let storeMaker = ( db ) => {
  let store = createStore(deriva, compose(
    applyMiddleware(
      thunkMiddleware

/* ,
      PouchMiddleware({
        path: '/docs',
        db,
        actions: {
          remove: doc => store.dispatch({type: actions.REMOVE_DOC, doc}),
          insert: doc => store.dispatch({type: actions.INSERT_DOC, doc}),
          update: doc => store.dispatch({type: actions.UPDATE_DOC, doc})
        }
      })
*/
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  store.actions = actions;

  return store;
}

export default storeMaker;
