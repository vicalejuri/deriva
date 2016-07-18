import actions from 'actions/';

import _ from 'lodash';

export const channels = (state = [], action) => {
  switch(action.type){
    case actions.LIST_CHANNEL:
      return state;
    case actions.LIST_CHANNEL_SUCCESS:
      console.log('channels', _.map(action.data, (d) => { return d.id }) )
      return action.data || [];
    default:
      return state;
  }
}


let defaultUpload = {
  error: false
}
export const channel_upload = (state = {}, action) => {
  switch (action.type) {
    case actions.INSERT_DOC:
      return defaultUpload;
    case actions.INSERT_DOC_ERROR:
      return Object.assign( {}, action.data, {error: true});
    case actions.INSERT_DOC_SUCCESS:
      return Object.assign( {}, action.data , {error: false} );
    default:
      return state;
  }
}
