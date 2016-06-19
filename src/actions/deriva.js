import _ from 'lodash';


export const LIST_DOCS = 'LIST_DOCS';
export const LIST_DOCS_SUCCESS = 'LIST_DOCS_SUCCESS';
export const LIST_DOCS_ERROR  = 'LIST_DOCS_ERROR';

export const list_all_docs = () => {
  return (dispatch) => {
    dispatch({type: LIST_DOCS})
    window.remote_db.query( 'docs/by_id', {include_docs: true} )
    .then( (results) => {
        let docs = _.map( results.rows, (v,k) => {
          return v.doc;
        });
        dispatch({type: LIST_DOCS_SUCCESS, data: docs});
    }).catch( (err) => {
        dispatch({type: LIST_DOCS_ERROR, data: err });
    });
  }
};






export const UPLOAD_DOCS = 'UPLOAD_DOCS';
export const UPLOAD_DOCS_SUCCESS = 'UPLOAD_DOCS_SUCCESS';
export const UPLOAD_DOCS_ERROR  = 'UPLOAD_DOCS_ERROR';

export const upload_docs = () => {
  return
}







export const GET_DOC = 'GET_DOC';
export const GET_DOC_SUCCESS = 'GET_DOC_SUCCESS';
export const GET_DOC_ERROR  = 'GET_DOC_ERROR';

export const get_doc = ( doc_id ) => {
  return (dispatch) => {
    dispatch({type: GET_DOC})
    window.remote_db.get( doc_id )
    .then( (doc) => {
        dispatch({type: GET_DOC_SUCCESS, data: doc});
    }).catch( (err) => {
        dispatch({type: GET_DOC_ERROR, data: err });
    });
  }
}
