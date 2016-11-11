
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
    return window.remote_db.login( credentials.username, credentials.password )
      .catch( (err) => { dispatch( loginError(err)) })
      .then( (user) => {
      /* If admin, login to _users db also */
      if(user.roles.indexOf('_admin') !== -1){
        dispatch( adminUsersLogin(credentials) );
      }
      dispatch( loginSuccess(user) );
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
     return new Promise( (resolve, reject) => {
        window.remote_db.getUser(username)
              .then(resolve).catch(reject)
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
    window.remote_db.getSession()
    .catch( (err) => { dispatch(remembermeError(err));    })
    .then( (succ) => { dispatch(remembermeSuccess(succ)); })
  }
}





/*
 * LOGOUT
 */
export const LOGOUT = "LOGOUT";
export function logout(){
  return (dispatch) => {
    dispatch( {type: LOGOUT} );
    return window.remote_db.logout();
  }
}







/*
 * signup
 */
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signup = (credentials, metadata) => {
  let full_metadata = Object.assign({}, metadata,
                        { verified: false,
                          banned: false ,
                          points: 10.0,
                          email: 'none@anonymous.com'});

  return (dispatch) => {
    dispatch({type: SIGNUP_REQUEST, credentials});
    return window.remote_db.signup( credentials.username, credentials.password, {metadata: full_metadata} );
  }
}


/*
 * ADMIN users functions
 */

/* Login to _users database */
export const ADMIN_USERS_LOGIN = 'ADMIN_USERS_LOGIN';
export const adminUsersLogin = (credentials) => {
  return (dispatch) => {
    dispatch( {type: ADMIN_USERS_LOGIN, credentials} );
    return window.users_db.login( credentials.username, credentials.password );
  }
}


/*
 * Return a list of all users
 */
import _ from 'lodash';
export const ADMIN_LIST_USERS = 'ADMIN_LIST_USERS';
export const admin_list_users = () => {
  return (dispatch) => {
    return new Promise( (resolve, reject) => {
      window.users_db.allDocs({startkey: 'org.couchdb.user',include_docs: true})
      .catch( reject )
      .then( (raw_query) => {
        let docs = _.map(raw_query.rows, _.property('doc') );
        resolve( docs );
      });
    });
  }
}


/*
 * Ban a user
 */
export const ADMIN_BAN_USER = 'ADMIN_BAN_USER';
export const admin_ban_user = (username) => {
  return (dispatch) => {
    return window.remote_db.putUser(username, {metadata: {banned: true}});
  }
};
