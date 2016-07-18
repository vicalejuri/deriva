import _ from 'lodash';
import dataModels from 'models/index.js';

export const LIST_DOC = 'LIST_DOC';
export const LIST_DOC_SUCCESS = 'LIST_DOC_SUCCESS';
export const LIST_DOC_ERROR  = 'LIST_DOC_ERROR';

export const list_all_doc = () => {
  return (dispatch) => {

    dispatch({type: LIST_DOC});

      //window.db.query( 'docs/by_id', {include_docs: true} )
      return window.db.find({selector: {type: 'deriva/doc'}})
      .then( (results) => {
          let docs = results.docs;
          dispatch({type: LIST_DOC_SUCCESS, data: docs});
          return Promise.resolve(docs)
      }).catch( (err) => {
          dispatch({type: LIST_DOC_ERROR, data: err });
          return Promise.reject(err)
      });
  }
};






export const INSERT_DOC = 'INSERT_DOC';
export const INSERT_DOC_SUCCESS = 'INSERT_DOC_SUCCESS';
export const INSERT_DOC_ERROR  = 'INSERT_DOC_ERROR';

export const insert_doc = ( doc_props ) => {
  let doc = new dataModels.Doc(doc_props);
  return (dispatch) => {
    dispatch({type: INSERT_DOC, data: doc})
    return window.db.put( doc ).then( (response) => {
      dispatch({type: INSERT_DOC_SUCCESS, data: response});
      return Promise.resolve(response);
    }).catch( (err) => {
      dispatch({type: INSERT_DOC_ERROR, data: err})
      return Promise.reject(err);
    });
  }

}







export const GET_DOC = 'GET_DOC';
export const GET_DOC_SUCCESS = 'GET_DOC_SUCCESS';
export const GET_DOC_ERROR  = 'GET_DOC_ERROR';

export const get_doc = ( doc_id ) => {
  return (dispatch) => {
    dispatch({type: GET_DOC, data: doc_id})
    return window.db.get( doc_id )
    .then( (doc) => {
        dispatch({type: GET_DOC_SUCCESS, data: doc});
        Promise.resolve(doc);
    }).catch( (err) => {
        dispatch({type: GET_DOC_ERROR, data: err });
        Promise.reject(err);
    });
  }
}




export const DELETE_DOC = 'DELETE_DOC';
export const DELETE_DOC_SUCCESS = 'DELETE_DOC_SUCCESS';
export const DELETE_DOC_ERROR  = 'DELETE_DOC_ERROR';

export const delete_doc = ( doc ) => {
  return (dispatch) => {
    dispatch({type: DELETE_DOC, data: doc});
    return window.db.remove( doc )
    .then( (doc) => {
        dispatch({type: DELETE_DOC_SUCCESS, data: doc});
        return Promise.resolve(doc);
    }).catch( (err) => {
        dispatch({type: DELETE_DOC_ERROR, data: err });
        return Promise.reject(err);
    });
  }
}
