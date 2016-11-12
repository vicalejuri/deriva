import config from 'config';
window.config = window.defaultConfig = config;

/*
 * Render the app main route
 */
import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;
window.ReactDOM = ReactDOM;

import { Router, match, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes/root';

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

import store from './store';
import actions from './actions';

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
