
/*
 * LOGIN_REQUEST
 */
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export function loginRequest(credentials) {
  return {type: LOGIN_REQUEST, credentials}
}
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export function loginSuccess( data) {
  return {type: LOGIN_SUCCESS, data}
}
export const LOGIN_ERROR = "LOGIN_ERROR";
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
        }
    });
  }
}


/*
 * user detail
 */
 export const GETUSER = "GET_USER";
 export function getUserRequest(){
   return {type: GETUSER}
 }

 export const GETUSER_SUCCESS = "GET_USER_SUCCESS";
 export function getUserSuccess(data){
   return {type: GETUSER_SUCCESS, data}
 }

 export function getUser( username ) {
   return (dispatch) => {
     window.remote_db.getUser( username, (err,response) => {

     })
   }
 }



/*
 * Remember me
 */

export const REMEMBERME = "REMEMBERME";
export function remembermeRequest() {
  return {type: REMEMBERME};
}
export const REMEMBERME_SUCCESS = "REMEMBERME_SUCCESS";
export function remembermeSuccess(data){
  return {type: REMEMBERME_SUCCESS, data}
}

export const REMEMBERME_ERROR = "REMEMBERME_ERROR"
export function remembermeError(data){
  return {type: REMEMBERME_ERROR, data}
}



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





/*
 * LOGOUT
 */
export const LOGOUT = "LOGOUT";
export function logout(){
  return (dispatch) => {
    window.remote_db.logout();
    dispatch( {type: LOGOUT} );
  }
}







/*
 * signup
 */
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signup = (credentials, metadata) => {
  return (dispatch) => {
    dispatch({type: SIGNUP_REQUEST, credentials});
    window.remote_db.signup( credentials.u, credentials.p, {metadata},
      (err,response) => {
        if(err)
          dispatch({type: SIGNUP_ERROR, data: err});
        else
          dispatch({type: SIGNUP_SUCCESS, data: response})
      }
    );
  }
}
