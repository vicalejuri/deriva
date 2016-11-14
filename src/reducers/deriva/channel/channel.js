import _ from 'lodash';
import * as ACTIONS from 'actions/channels.js';

export const channels = (state = [], action) => {
  switch(action.type){
    case ACTIONS.LIST_ALL_CHANNELS_SUCCESS:
      return action.data || [];
    case ACTIONS.INSERT_CHANNEL_SUCCESS:
      return [...state, action.data];
    case ACTIONS.REMOVE_CHANNEL_SUCCESS:
      return state.filter( (c) => {
        return (c.id !== action.data.id) 
      } );
    default:
      return state;
  }
}