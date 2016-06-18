import actions from 'actions/';

const docs = (state = [], action) => {
  switch(action.type){
    case actions.LIST_DOCS:
      console.log("DOCS REDUCER");
      return state;
    case actions.LIST_DOCS_SUCCESS:
      console.log('DOCS_SUCCESS', action.data);
      return action.data;
    default:
      return state;
  }
}

export default docs;
