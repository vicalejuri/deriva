import actions from 'actions/';
import _ from 'lodash';

/*
 * A simple Object Reducer.
 * Responds to SET_UI actions
 *
 * dispatch( set_ui_property('header.visible',false) )
 */
const uiReducer = ( initialState ) => {
  return (state = initialState, action) => {
    switch(action.type){
      case actions.SET_UI:
        let ui = _.cloneDeep( state )
        _.set( ui, action.data.key, action.data.value );
        return ui;
      default:
        return state;
    }
  }
}

export default  uiReducer;
