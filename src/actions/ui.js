import _ from 'lodash';
import {browserHistory} from 'react-router';

export const SET_UI = 'SET_UI';

export const set_ui_property = (property, value) => {
  return (dispatch) => {
    return dispatch({type: SET_UI, data: {key: property, value: value}});
  }
};


export const NAVIGATE_TO = 'NAVIGATE_TO'
export const navigate = ( url ) => {
  return (dispatch) => {
    dispatch({type: NAVIGATE_TO, data: url});
    browserHistory.push( url );
  }
}
