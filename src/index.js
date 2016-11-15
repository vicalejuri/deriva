import _ from 'lodash';

import actions from './actions';
import routes from  './routes';
import store from './store';

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, match, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

window.React = React;
window.ReactDOM = ReactDOM;
window._ = _;

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

// Create redux store to save app state
window.store = store;
window.actions = actions;

// Render app routes
match({routes, location}, () => {
  try {
    ReactDOM.render(
      <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
      </Provider>,
      document.getElementById('container')
    )
  } catch( e ){
    console.error("Oh snap!", e.message);
    console.trace(e.stack);
  }
});
