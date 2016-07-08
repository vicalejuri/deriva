import actions from 'actions/';


const remotedb = (state = null, action) => {
  switch(action.type){
    case actions.REMOTEDB_READY:
      return Object.assign({}, state, action.db );
    case actions.SET_SYNC_STATE:
      return {data: action.data}
    default:
      return state;
  }
}

export default remotedb;
