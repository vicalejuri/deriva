import _ from 'lodash';
import dataModels from 'models/index.js';
import * as PouchActions from './pouchdb.js';

export const LIST_DOC = 'LIST_DOC';
export const LIST_DOC_SUCCESS = 'LIST_DOC_SUCCESS';
export const LIST_DOC_ERROR  = 'LIST_DOC_ERROR';

export const find_all = _.wrap(PouchActions.findAll, (action, args) => {
  return action(window.db, LIST_DOC, 'deriva/docs', args);
});
/*
export const list_all_doc = () => {
  return (dispatch) => {
    dispatch({type: LIST_DOC});
      return window.db.rel.find('deriva/docs')
      .then( (results) => {
          let docs = results['deriva/docs'];
          dispatch({type: LIST_DOC_SUCCESS, data: docs});
          return Promise.resolve(docs)
      }).catch( (err) => {
          dispatch({type: LIST_DOC_ERROR, data: err });
          return Promise.reject(err)
      });
  }
};
*/





export const FIND_DOC         = 'FIND_DOC';
export const FIND_DOC_SUCCESS = 'FIND_DOC_SUCCESS';
export const FIND_DOC_ERROR   = 'FIND_DOC_ERROR';

export const find = _.wrap( PouchActions.find, (action, args) => {
  return action(window.db, FIND_DOC, 'deriva/docs', args);
});

/*
export const get_doc = ( doc_id ) => {
  return (dispatch) => {
    dispatch({type: GET_DOC, data: doc_id})
    return window.db.rel.find( 'deriva/doc', doc_id )
    .then( (response) => {
        let doc = response['deriva/docs'][0]
        dispatch({type: GET_DOC_SUCCESS, data: doc});
        return Promise.resolve(doc);
    }).catch( (err) => {
        dispatch({type: GET_DOC_ERROR, data: err });
        return Promise.reject(err);
    });
  }
}*/







export const INSERT_DOC = 'INSERT_DOC';
export const INSERT_DOC_SUCCESS = 'INSERT_DOC_SUCCESS';
export const INSERT_DOC_ERROR  = 'INSERT_DOC_ERROR';

export const insert = _.wrap( PouchActions.insert, (action, args) => {
  return action(window.db, INSERT_DOC, 'deriva/channels', args);
});

/*
export const insert_doc = ( doc_props ) => {
  let doc = new window.dataModels.Doc(doc_props);
  return (dispatch) => {
    dispatch({type: INSERT_DOC, data: doc})
    return window.db.rel.save( 'deriva/doc', doc ).then( (response) => {
      let new_doc = response['deriva/docs'][0]
      dispatch({type: INSERT_DOC_SUCCESS, data: new_doc});
      return Promise.resolve(new_doc);
    }).catch( (err) => {
      dispatch({type: INSERT_DOC_ERROR, data: err})
      return Promise.reject(err);
    });
  }

}
*/




export const REMOVE_DOC = 'REMOVE_DOC';
export const REMOVE_DOC_SUCCESS = 'REMOVE_DOC_SUCCESS';
export const REMOVE_DOC_ERROR  = 'REMOVE_DOC_ERROR';

export const remove = _.wrap( PouchActions.remove, (action, args) => {
  return action(window.db, REMOVE_DOC, 'deriva/docs', args);
});

/*
export const delete_doc = ( doc ) => {
  return (dispatch) => {
    dispatch({type: DELETE_DOC, data: doc});
    return window.db.rel.del( 'deriva/doc', doc )
    .then( (response) => {
        dispatch({type: DELETE_DOC_SUCCESS, data: doc});
        return Promise.resolve(doc);
    }).catch( (err) => {
        dispatch({type: DELETE_DOC_ERROR, data: err });
        return Promise.reject(err);
    });
  }
}*/
