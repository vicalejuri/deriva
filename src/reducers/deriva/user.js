import actions from 'actions/';

let AnonymousState = {
    id: -1,
    authenticated: false,
    name: 'anonymous',
    message: '',
    roles: ['_visitor'],
    error: false
}

const user = (state = AnonymousState, action) => {
  if(action.type == actions.user.LOGOUT){
      return Object.assign({}, state, AnonymousState );
  } else if(action.type == actions.user.LOGIN_ERROR){
      return Object.assign({},state,{
        authenticated: false,
        message: action.data.message || 'CouchDB is offline',
        error: true,
        data: action.data
      });
  } else if(action.type == actions.user.LOGIN_SUCCESS) {
      return Object.assign({},state,{
        name: action.data.name,
        data: action.data,
        roles: action.data.roles,
        error: false,
        message: `Hello ${action.data.name}`,
        authenticated: true
      });
    } else if(action.type == actions.user.REMEMBERME_ERROR) {
      return Object.assign({}, state, {
        authenticated: false,
        error: true,
        message: ""
      })
    } else if(action.type == actions.user.REMEMBERME_SUCCESS) {
      return Object.assign({}, state, {
        name: action.data.userCtx.name,
        data: action.data.userCtx,
        roles: action.data.userCtx.roles,
        error: false,
        message: `Hello ${action.data.userCtx.name}`,
        authenticated: true
      })
    } else {
      return state;
    }
}

export default user;
