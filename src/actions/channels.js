import _ from 'lodash';
import * as PouchActions from './pouchdb.js';

export const LIST_ALL_CHANNELS          = 'LIST_ALL_CHANNELS';
export const LIST_ALL_CHANNELS_SUCCESS  = 'LIST_ALL_CHANNELS_SUCCESS';
export const LIST_ALL_CHANNELS_ERROR    = 'LIST_ALL_CHANNELS_ERROR';

export const find_all = _.wrap(PouchActions.findAll, (action, args) => {
  return action(window.db, LIST_ALL_CHANNELS, 'deriva/channels', args);
});



export const FIND_CHANNEL = 'FIND_CHANNEL';
export const FIND_CHANNEL_SUCCESS = 'FIND_CHANNEL_SUCCESS';
export const FIND_CHANNEL_ERROR = 'FIND_CHANNEL_ERROR';

export const find = _.wrap( PouchActions.find, (action, args) => {
  return action(window.db, FIND_CHANNEL, 'deriva/channels', args);
});



export const INSERT_CHANNEL = 'INSERT_CHANNEL';
export const INSERT_CHANNEL_SUCCESS = 'INSERT_CHANNEL_SUCCESS';
export const INSERT_CHANNEL_ERROR = 'INSERT_CHANNEL_ERROR';

export const insert = _.wrap( PouchActions.insert, (action, args) => {
  return action(window.db, INSERT_CHANNEL, 'deriva/channels', args);
});

/*
export const insert = ( doc ) => {
  return (dispatch) => {
    dispatch({type: INSERT_CHANNEL, data: doc});
    return new Promise( (resolve,reject) => {
      window.db.rel.save( 'deriva/channel', doc ).then( (response) => {
        let channel = response['deriva/channels'][0];
        resolve( channel )
      }).catch( (err) => {
        dispatch( {type: PouchActions.INSERT_ERROR, data: err} );
        reject( err );
      });
    });
  }
}
*/




export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const REMOVE_CHANNEL_SUCCESS = 'REMOVE_CHANNEL_SUCCESS';
export const REMOVE_CHANNEL_ERROR   = 'REMOVE_CHANNEL_ERROR';

export const remove = _.wrap( PouchActions.remove, (action, args) => {
  return action(window.db, REMOVE_CHANNEL, 'deriva/channels', args);
});

/*
export const remove = ( doc ) => {
  return (dispatch) => {
    dispatch({type: REMOVE_CHANNEL, data: doc});
    return window.db.remove( doc )
    .then( (doc) => {
        return Promise.resolve(doc);
    }).catch( (err) => {
        dispatch( {type: PouchActions.REMOVE_ERROR, data: err});
        return Promise.reject(err);
    });
  }
}
*/