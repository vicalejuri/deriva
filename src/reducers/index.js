import { combineReducers } from 'redux';
import user from './user';
import remotedb from './remotedb';

import { docs , watch, upload } from './deriva/docs/docs.js';
import { channels } from './deriva/channel/channel.js';

const deriva = combineReducers({
  user,
  remotedb,

  docs, watch, upload,
  channels
});

export default deriva;
