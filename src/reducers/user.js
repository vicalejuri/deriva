import {LOGIN_ERROR, LOGIN_SUCCESS,
        REMEMBERME_ERROR, REMEMBERME_SUCCESS,
        LOGOUT } from '../actions';

let AnonymousState = {
    id: -1,
    authenticated: false,
    name: 'anonymous',
    message: '',
    error: false
}

const user = (state = AnonymousState, action) => {
  switch(action.type){
    case LOGOUT:
      return Object.assign({}, state, AnonymousState );
    case LOGIN_ERROR:
      return Object.assign({},state,{
        authenticated: false,
        message: action.data.message,
        error: true,
        data: action.data
      });
    case LOGIN_SUCCESS:
      debugger;
      return Object.assign({},state,{
        name: action.data.name,
        data: action.data,
        error: false,
        message: `Hello ${action.data.name}`,
        authenticated: true
      });
    case REMEMBERME_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: true,
        message: "Your cookies are rotten. Login to get new ones!"
      })
    case REMEMBERME_SUCCESS:
      return Object.assign({}, state, {
        name: action.data.userCtx.name,
        data: action.data.userCtx,
        error: false,
        message: `Hello ${action.data.userCtx.name}`,
        authenticated: true
      })
    default:
      return state;
  }
}

export default user;
