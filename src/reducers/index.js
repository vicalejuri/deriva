import { combineReducers } from 'redux';
import user from './user';
import remotedb from './remotedb';

import docs from './deriva/docs/list.js';

const deriva = combineReducers({
  user,
  remotedb,
  docs
});

export default deriva;
