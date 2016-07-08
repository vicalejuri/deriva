import actions from 'actions/';

import _ from 'lodash';

export const docs = (state = [], action) => {
  switch(action.type){
    case actions.LIST_DOC:
      return state;
    case actions.LIST_DOC_SUCCESS:
      return action.data || [];
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
      return state;
    case actions.GET_DOC_ERROR:
      return  Object.assign( {}, action.data, {loaded: false, error: true});
    case actions.GET_DOC_SUCCESS:
      return  Object.assign( {}, action.data, {loaded: true, error: false});
    default:
      return state;
  }
}

let defaultUpload = {
  error: false
}
export const upload = (state = {}, action) => {
  switch (action.type) {
    case actions.INSERT_DOC_ERROR:
      return Object.assign( {}, action.data, {error: true});
    case actions.INSERT_DOC_SUCCESS:
      return Object.assign( {}, action.data , {error: false} );
    default:
      return state;
  }
}
