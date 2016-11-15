import _ from 'lodash';
import * as PouchActions from './pouchdb.js';

export const LIST_DOC = 'LIST_DOC';
export const LIST_DOC_SUCCESS = 'LIST_DOC_SUCCESS';
export const LIST_DOC_ERROR  = 'LIST_DOC_ERROR';

export const find_all = _.wrap(PouchActions.findAll, (action, args) => {
  return action(window.db, LIST_DOC, 'docs', args);
});



export const FIND_DOC         = 'FIND_DOC';
export const FIND_DOC_SUCCESS = 'FIND_DOC_SUCCESS';
export const FIND_DOC_ERROR   = 'FIND_DOC_ERROR';

export const find = _.wrap( PouchActions.find, (action, args) => {
  return action(window.db, FIND_DOC, 'docs', args);
});






export const INSERT_DOC = 'INSERT_DOC';
export const INSERT_DOC_SUCCESS = 'INSERT_DOC_SUCCESS';
export const INSERT_DOC_ERROR  = 'INSERT_DOC_ERROR';

export const insert = _.wrap( PouchActions.insert, (action, args) => {
  return action(window.db, INSERT_DOC, 'channels', args);
});




export const REMOVE_DOC = 'REMOVE_DOC';
export const REMOVE_DOC_SUCCESS = 'REMOVE_DOC_SUCCESS';
export const REMOVE_DOC_ERROR  = 'REMOVE_DOC_ERROR';

export const remove = _.wrap( PouchActions.remove, (action, args) => {
  return action(window.db, REMOVE_DOC, 'docs', args);
});
