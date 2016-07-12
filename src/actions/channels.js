import _ from 'lodash';
import dataModels from 'models/index.js';

export const LIST_CHANNEL = 'LIST_CHANNEL';
export const LIST_CHANNEL_SUCCESS = 'LIST_CHANNEL_SUCCESS';
export const LIST_CHANNEL_ERROR  = 'LIST_CHANNEL_ERROR';

export const list_all_channel = () => {
  return (dispatch) => {
    dispatch({type: LIST_CHANNEL})
    //window.db.query( 'docs/by_id', {include_docs: true} )
    window.db.find({selector: {type: 'deriva/channel'}})
    .then( (results) => {
        let docs = results.docs;
        dispatch({type: LIST_CHANNEL_SUCCESS, data: docs});
    }).catch( (err) => {
        dispatch({type: LIST_CHANNEL_ERROR, data: err });
    });
  }
};






export const INSERT_CHANNEL = 'INSERT_CHANNEL';
export const INSERT_CHANNEL_SUCCESS = 'INSERT_CHANNEL_SUCCESS';
export const INSERT_CHANNEL_ERROR  = 'INSERT_CHANNEL_ERROR';

export const insert_channel = ( doc_props ) => {
  let doc = new dataModels.Doc(doc_props);
  return (dispatch) => {
    dispatch({type: INSERT_CHANNEL, data: doc})
    window.db.put( doc ).then( (response) => {
      debugger;
      dispatch({type: INSERT_CHANNEL_SUCCESS, data: doc});
    }).catch( (err) => {
      dispatch({type: INSERT_CHANNEL_ERROR, data: err})
    });
  }

}







export const GET_CHANNEL = 'GET_CHANNEL';
export const GET_CHANNEL_SUCCESS = 'GET_CHANNEL_SUCCESS';
export const GET_CHANNEL_ERROR  = 'GET_CHANNEL_ERROR';

export const get_channel = ( doc_id ) => {
  return (dispatch) => {
    dispatch({type: GET_CHANNEL, data: doc_id})
    window.db.get( doc_id )
    .then( (doc) => {
        dispatch({type: GET_CHANNEL_SUCCESS, data: doc});
    }).catch( (err) => {
        dispatch({type: GET_CHANNEL_ERROR, data: err });
    });
  }
}




export const DELETE_CHANNEL = 'DELETE_CHANNEL';
export const DELETE_CHANNEL_SUCCESS = 'DELETE_CHANNEL_SUCCESS';
export const DELETE_CHANNEL_ERROR  = 'DELETE_CHANNEL_ERROR';

export const delete_channel = ( doc ) => {
  return (dispatch) => {
    dispatch({type: DELETE_CHANNEL, data: doc});
    window.db.remove( doc )
    .then( (doc) => {
        dispatch({type: DELETE_CHANNEL_SUCCESS, data: doc});
    }).catch( (err) => {
        dispatch({type: DELETE_CHANNEL_ERROR, data: err });
    });
  }
}
