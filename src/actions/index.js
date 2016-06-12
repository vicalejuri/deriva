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
        }
    });
  }
}

export const signup = (credentials) => {

}
