import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, browserHistory } from 'react-router';

import Parse from 'parse';
import dataSources from 'sources';

// Render the routing to the dom
import App , {DefaultComponent} from 'components/Main';
import WatchDoc from 'components/deriva/docs/WatchDoc.js';
import ListDoc from 'components/deriva/docs/ListDoc.js';
import UploadDoc from 'components/deriva/docs/UploadDoc.js';
import SignupComponent from 'components/deriva/user/signup.js';

try {
ReactDOM.render( (<Router history={browserHistory}>
<Route path="/" component={App}>
  <Route path="/list" component={ListDoc} />
  <Route path="/upload" component={UploadDoc} />
  <Route path="/watch/:docId" component={WatchDoc} />
  <Route path="/signup" component={SignupComponent} />
  <Route path="*" component={DefaultComponent} />
</Route>
</Router>
) , document.body);

} catch (e) {
  console.error("Cant start REACT render." , e.message);
  console.error(e);
}

// Start parse API
Parse.initialize( window.__PARSE_APPNAME__ );
Parse.serverURL = window.__PARSE_ENDPOINT__;

// Exports to global filespace window
window.Parse = Parse;
window.dataSources = dataSources;

window.React = React;
window.ReactDOM = ReactDOM;

window.App = App;
