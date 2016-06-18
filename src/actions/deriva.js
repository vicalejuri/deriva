export const LIST_DOCS = 'LIST_DOCS';
export const LIST_DOCS_SUCCESS = 'LIST_DOCS_SUCCESS';
export const LIST_DOCS_ERROR  = 'LIST_DOCS_ERROR';

import _ from 'lodash';

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
