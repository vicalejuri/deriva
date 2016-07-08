import { combineReducers } from 'redux';
import user from './user';
import remotedb from './remotedb';

import { docs , watch, upload } from './deriva/docs/docs.js';

const deriva = combineReducers({
  user,
  remotedb,

  docs, watch, upload
});

export default deriva;
