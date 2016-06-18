import { REMOTEDB_READY } from '../actions';


const remotedb = (state = null, action) => {
  switch(action.type){
    case REMOTEDB_READY:
      return Object.assign({}, state, action.db );
    default:
      return state;
  }
}

export default remotedb;
