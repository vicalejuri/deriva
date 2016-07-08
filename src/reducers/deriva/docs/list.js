import actions from 'actions/';

const docs = (state = [], action) => {
  switch(action.type){
    case actions.LIST_DOC:
      return state;
    case actions.LIST_DOC_SUCCESS:
      return action.data || [];
    default:
      return state;
  }
}

export default docs;
