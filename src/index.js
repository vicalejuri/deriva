import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, browserHistory } from 'react-router';

import Parse from 'parse';
import dataSources from 'sources';

// Start parse API
Parse.initialize('aderiva');
Parse.serverURL = 'http://localhost:1337/parse';

// Render the routing to the dom
import App , {DefaultComponent} from 'components/Main';
import WatchDoc from 'components/deriva/WatchDoc.js';
import ListDoc from 'components/deriva/ListDoc.js';

try {
ReactDOM.render( (<Router history={browserHistory}>
<Route path="/" component={App}>
  <Route path="/list" component={ListDoc} />
  <Route path="/watch/:docId" component={WatchDoc} />
  <Route path="*" component={DefaultComponent} />
</Route>
</Router>
) , document.body);

} catch (e) {
  console.error("Cant start REACT render." , e.message);
  console.error(e);
}

// Exports to global filespace window
window.Parse = Parse;
window.dataSources = dataSources;

window.React = React;
window.ReactDOM = ReactDOM;

window.App = App;
