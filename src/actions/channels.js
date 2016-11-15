import _ from 'lodash';
import * as PouchActions from './pouchdb.js';

export const LIST_ALL_CHANNELS          = 'LIST_ALL_CHANNELS';
export const LIST_ALL_CHANNELS_SUCCESS  = 'LIST_ALL_CHANNELS_SUCCESS';
export const LIST_ALL_CHANNELS_ERROR    = 'LIST_ALL_CHANNELS_ERROR';

export const find_all = _.wrap(PouchActions.findAll, (action, args) => {
  return action(window.db, LIST_ALL_CHANNELS, 'channels', args);
});



export const FIND_CHANNEL = 'FIND_CHANNEL';
export const FIND_CHANNEL_SUCCESS = 'FIND_CHANNEL_SUCCESS';
export const FIND_CHANNEL_ERROR = 'FIND_CHANNEL_ERROR';

export const find = _.wrap( PouchActions.find, (action, args) => {
  return action(window.db, FIND_CHANNEL, 'channels', args);
});



export const INSERT_CHANNEL = 'INSERT_CHANNEL';
export const INSERT_CHANNEL_SUCCESS = 'INSERT_CHANNEL_SUCCESS';
export const INSERT_CHANNEL_ERROR = 'INSERT_CHANNEL_ERROR';

export const insert = _.wrap( PouchActions.insert, (action, args) => {
  return action(window.db, INSERT_CHANNEL, 'channels', args);
});



export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const REMOVE_CHANNEL_SUCCESS = 'REMOVE_CHANNEL_SUCCESS';
export const REMOVE_CHANNEL_ERROR   = 'REMOVE_CHANNEL_ERROR';

export const remove = _.wrap( PouchActions.remove, (action, args) => {
  return action(window.db, REMOVE_CHANNEL, 'channels', args);
});
