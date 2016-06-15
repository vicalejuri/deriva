import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

//let WebTorrent = require('webtorrent/webtorrent.min.js');

import { Router, Route, Link, browserHistory } from 'react-router';

import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'

import config from 'config';
import dataModels from 'models/index.js';

import App , {DefaultComponent} from 'components/Main';
import NotFoundComponent from 'components/404.js';
import WatchDoc from 'components/deriva/docs/WatchDoc.js';
import ListDoc from 'components/deriva/docs/ListDoc.js';
import UploadDoc from 'components/deriva/docs/UploadDoc.js';
import SignupComponent from 'components/deriva/user/signup.js';
import RecordComponent from 'components/deriva/player/Record.js'
import LivePlayerComponent from 'components/deriva/player/LivePlayer.js'

// Service worker
if(navigator.serviceWorker){
  navigator.serviceWorker.register('/sw.js');
}

// Store state
import { Provider } from 'react-redux';
import store from './store';


// Start Pouchdb API
var remote_db = new PouchDB( config.POUCHDB_SERVER, {skipSetup: true});
PouchDB.debug.enable('pouchdb:http');

PouchDB.adapter('worker', require('worker-pouch'));
PouchDB.plugin( PouchDBAuth );
remote_db.info().then( (info) => {
  render();
});

// Local sync
var local_db = new PouchDB('user')
local_db.sync( remote_db, {live: true, retry: true}).on('error', (e) => {
  console.log('sync error', e);
});


// webtorrent
// let webtrrnt_client = new WebTorrent()






// Render the routing to the dom
function render(){
  try {
    ReactDOM.render( (<Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/list" component={ListDoc} />
        <Route path="/upload" component={UploadDoc} />
        <Route path="/watch/:docId" component={WatchDoc} />
        <Route path="/live/record" component={RecordComponent} />
        /*
          <Route path="/live/:docId" component={LivePlayerComponent} />
        */
        <Route path="/signup" component={SignupComponent} />
        <Route path="*" component={NotFoundComponent} />
      </Route>
    </Router>
  </Provider>) , document.getElementById('app'));

  } catch (e) {
    console.error("Error on react render." , e.message);
    console.error(e);
  }
}

// Export for debugging
window.PouchDB = PouchDB
window.remote_db = remote_db;
window.local_db = local_db;

//window.trrnt = webtrrnt_client;

window.React = React;
window.ReactDOM = ReactDOM;

window.dataModels =  dataModels;
window.store = store;

window.App = App;
