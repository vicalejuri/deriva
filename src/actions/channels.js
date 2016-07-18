import _ from 'lodash';

export const LIST_CHANNEL = 'LIST_CHANNEL';
export const LIST_CHANNEL_SUCCESS = 'LIST_CHANNEL_SUCCESS';
export const LIST_CHANNEL_ERROR  = 'LIST_CHANNEL_ERROR';

export const list_all_channel = () => {
  return (dispatch) => {

    dispatch({type: LIST_CHANNEL});
    //window.db.query( 'docs/by_id', {include_docs: true} )
    return window.db.rel.find('deriva/channels')
      .then( (results) => {
          let docs = results['deriva/channels'];
          dispatch({type: LIST_CHANNEL_SUCCESS, data: docs});
          return Promise.resolve(docs)
      }).catch( (err) => {
          dispatch({type: LIST_CHANNEL_ERROR, data: err });
          return Promise.reject(err);
      });
  }
};






export const INSERT_CHANNEL = 'INSERT_CHANNEL';
export const INSERT_CHANNEL_SUCCESS = 'INSERT_CHANNEL_SUCCESS';
export const INSERT_CHANNEL_ERROR  = 'INSERT_CHANNEL_ERROR';

export const insert_channel = ( chann_props ) => {
  let doc = new window.dataModels.Channel( chann_props );
  return (dispatch) => {
    dispatch({type: INSERT_CHANNEL, data: doc})
    return window.db.rel.save( 'deriva/channel', doc ).then( (response) => {
      let channel = response['deriva/channels'][0];
      dispatch({type: INSERT_CHANNEL_SUCCESS, data: channel});
      return Promise.resolve( channel )
    }).catch( (err) => {
      dispatch({type: INSERT_CHANNEL_ERROR, data: err})
      return Promise.reject( err );
    });
  }

}







export const GET_CHANNEL = 'GET_CHANNEL';
export const GET_CHANNEL_SUCCESS = 'GET_CHANNEL_SUCCESS';
export const GET_CHANNEL_ERROR  = 'GET_CHANNEL_ERROR';

export const get_channel = ( doc_id ) => {
  return (dispatch) => {
    dispatch({type: GET_CHANNEL, data: doc_id})
    return window.db.get( doc_id )
    .then( (doc) => {
        dispatch({type: GET_CHANNEL_SUCCESS, data: doc});
        return Promise.resolve(doc)
    }).catch( (err) => {
        dispatch({type: GET_CHANNEL_ERROR, data: err });
        return Promise.reject(err);
    });
  }
}




export const DELETE_CHANNEL = 'DELETE_CHANNEL';
export const DELETE_CHANNEL_SUCCESS = 'DELETE_CHANNEL_SUCCESS';
export const DELETE_CHANNEL_ERROR  = 'DELETE_CHANNEL_ERROR';

export const delete_channel = ( doc ) => {
  return (dispatch) => {
    dispatch({type: DELETE_CHANNEL, data: doc});
    return window.db.remove( doc )
    .then( (doc) => {
        dispatch({type: DELETE_CHANNEL_SUCCESS, data: doc});
        return Promise.resolve(doc);
    }).catch( (err) => {
        dispatch({type: DELETE_CHANNEL_ERROR, data: err });
        return Promise.reject(err);
    });
  }
}
