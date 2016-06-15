export const addDoc = (doc) => {
  return {
    type: 'ADD_DOC',
    id: doc._id,
    doc
  }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequest(credentials) {
  return {type: LOGIN_REQUEST, credentials}
}
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess( data) {
  return {type: LOGIN_SUCCESS, data}
}
export const LOGIN_ERROR = 'LOGIN_ERROR';
export function loginError( data) {
  return {type: LOGIN_ERROR, data}
}

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginRequest(credentials))
    window.remote_db.login( credentials.u, credentials.p,
      (err, response) => {
        if(err){
          dispatch(loginError( err ));
        } else {
          dispatch(loginSuccess( response ));
          dispatch()
        }
    });
  }
}


export const REMEMBERME = 'REMEMBERME';
export function remembermeRequest() {
  return {type: REMEMBERME};
}
export const REMEMBERME_SUCCESS = 'REMEMBERME_SUCCESS';
export function remembermeSuccess(data){
  return {type: REMEMBERME_SUCCESS, data}
}

export const REMEMBERME_ERROR = 'REMEMBERME_ERROR'
export function remembermeError(data){
  return {type: REMEMBERME_ERROR, data}
}


/*
 * Remember me function
 */
export function rememberme( ) {
  return (dispatch) => {
    window.remote_db.getSession( (err,response) => {
      if(err || !response.userCtx.name){
        dispatch( remembermeError(response) );
      }else {
        dispatch( remembermeSuccess(response) );
      }
    });
  }
}






export const LOGOUT = 'LOGOUT';
export function logout(){
  return (dispatch) => {
    window.remote_db.logout();
    dispatch( {type: LOGOUT} );
  }
}







export const signup = (credentials) => {

}
