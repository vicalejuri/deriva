import _ from 'lodash';
import * as ACTIONS from 'actions/channels.js';

/*
 * Watch these actions and store it as 
 * a list of channels, called 'channels',
 */
export const channels = (state = [], action) => {
  switch(action.type){
    case ACTIONS.LIST_ALL_CHANNELS_SUCCESS:
      return action.data || [];
    case ACTIONS.INSERT_CHANNEL_SUCCESS:
      return _.unionBy( [action.data],  state, 'id' );
    case ACTIONS.REMOVE_CHANNEL_SUCCESS:
      return _.without( state , action.data );
    default:
      return state;
  }
}