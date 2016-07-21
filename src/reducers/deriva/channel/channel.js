import actions from 'actions/';

import _ from 'lodash';

export const channels = (state = [], action) => {
  switch(action.type){
    case actions.LIST_CHANNEL:
      return state;
    case actions.LIST_CHANNEL_SUCCESS:
      return action.data || [];
    default:
      return state;
  }
}


let defaultInsert = {
  error: false
}
export const channel_insert = (state = {}, action) => {
  switch (action.type) {
    case actions.INSERT_DOC:
      return defaultInsert;
    case actions.INSERT_DOC_ERROR:
      return Object.assign( {}, action.data);
    case actions.INSERT_DOC_SUCCESS:
      return Object.assign( {}, action.data);
    default:
      return state;
  }
}
