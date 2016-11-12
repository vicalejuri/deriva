import _ from 'lodash';
import * as ACTIONS from 'actions/channels.js';

export const channels = (state = [], action) => {
  switch(action.type){
    case ACTIONS.LIST_ALL_CHANNELS:
      return state;
    case ACTIONS.LIST_ALL_CHANNELS_SUCCESS:
      return action.data || [];
    default:
      return state;
  }
}


export const channel_insert = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.INSERT_CHANNEL:
      return state;
    case ACTIONS.INSERT_CHANNEL_ERROR:
      return Object.assign( {}, action.data);
    case ACTIONS.INSERT_CHANNEL_SUCCESS:
      return Object.assign( {}, action.data);
    default:
      return state;
  }
}
