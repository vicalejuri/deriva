import actions from 'actions/';

import _ from 'lodash';

export const docs = (state = [], action) => {
  switch(action.type){
    case actions.LIST_DOC:
      return state;
    case actions.LIST_DOC_SUCCESS:
      return action.data || [];
    case actions.INSERT_DOC_SUCCESS:
      return _.union( state, [action.data] );
    case actions.DELETE_DOC_SUCCESS:
      return _.without( state , action.data );
    default:
      return state;
  }
}

let defaultWatch = {
  loaded: false,
  error: false
}
export const  watch = (state = defaultWatch, action) => {
  switch (action.type) {
    case actions.GET_DOC:
      return defaultWatch;
    case actions.GET_DOC_ERROR:
      return  Object.assign( {}, action.data);
    case actions.GET_DOC_SUCCESS:
      return  Object.assign( {}, action.data);
    default:
      return state;
  }
}

let defaultInsert = {
  error: false
}
export const insert = (state = {}, action) => {
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
