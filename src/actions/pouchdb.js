/*
 * Pouchdb Online/offline
 */
export const POUCHDB_READY = 'POUCHDB_READY';
export function dbReady( db ){
  return {type: POUCHDB_READY, db };
}
export const POUCHDB_ERROR = 'POUCHDB_ERROR';
export function dbError( db ){
  return {type: POUCHDB_ERROR, db };
}

export const POUCHDB_PULL          = 'POUCHDB_PULL';
export const POUCHDB_PULL_SUCCESS  = 'POUCHDB_PULL_SUCCESS';
export const POUCHDB_PULL_ERROR    = 'POUCHDB_PULL_ERROR';

export const POUCHDB_PUSH          = 'POUCHDB_PUSH';
export const POUCHDB_PUSH_SUCCESS  = 'POUCHDB_PUSH_SUCCESS'
export const POUCHDB_PUSH_ERROR    = 'POUCHDB_PUSH_ERROR'

export const REMOVE_ERROR = 'POUCHDB_REMOVE_ERROR';
export const INSERT_ERROR = 'POUCHDB_INSERT_ERROR';
export const FIND_ERROR    = 'POUCHDB_FIND_ERROR';
export const QUERY_ERROR  = 'POUCHDB_QUERY_ERROR';

export const SET_SYNC_STATE = 'SET_SYNC_STATE';


/*
 * A redux action for getting all documents of type doc_type
 * from PouchDB 'db'.
 * 
 * dispatch redux 'ACTION' multiple times,
 *    'ACTION' on request
 *    'ACTION_SUCCESS' on sucess
 *    'ACTION_ERROR' on error
 */
export function findAll( db, action , doc_type , args=false){
  return (dispatch) => {
    dispatch({type: action});
    return new Promise( (resolve,reject) => {
      db.rel.find( doc_type ).then( (results) => {
        let r = results[doc_type];
        dispatch( {type: `${action}_SUCCESS`, data: r});
        return resolve( r );
      }).catch( (err) => {
        dispatch( {type: `${action}_ERROR`, data: err });
        reject( err );
      });
    });
  }
}


/*
 * A redux action to get a single document by the given 'id' from 'db'
 */
export function find( db, action, doc_type, doc_id_params ) {
  return (dispatch) => {
    dispatch({type: action, data: doc_id_params})
    return new Promise( (resolve, reject) => {
      db.rel.find( doc_type, doc_id_params )
        .then( (results) => {
          let r = results[doc_type];
          if(r.length == 1) r = r[0];
        
          dispatch( {type: `${action}_SUCCESS`, data: r});
          resolve(r);
      }).catch( (err) => {
          dispatch( {type: `${action}_ERROR`, data: err} );
          reject(err);
      });
    });
  }
}