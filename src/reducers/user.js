import {LOGIN_ERROR, LOGIN_SUCCESS} from '../actions';

const user = (state = {
  id: -1,
  authenticated: false,
  name: 'anonymous',
  message: '',
  error: false
}, action) => {
  switch(action.type){
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
    default:
      return state;
  }
}

export default user;
