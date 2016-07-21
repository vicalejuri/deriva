import _ from 'lodash';

export const SET_UI = 'SET_UI';

export const set_ui = (property, value) => {
  return (dispatch) => {
    return dispatch({type: SET_UI, data: {key: property, value: value}});
  }
};
