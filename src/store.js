import { createStore , applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import actions from './actions';
import deriva from './reducers';

const loggerMiddleware = createLogger()

let store = createStore(deriva,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

store.actions = actions;
export default store;
