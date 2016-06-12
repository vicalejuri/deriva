import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
let WebTorrent = require('webtorrent/webtorrent.min.js');

import { Router, Route, Link, browserHistory } from 'react-router';

import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'

import dataModels from 'models/index.js';

import App , {DefaultComponent} from 'components/Main';
import WatchDoc from 'components/deriva/docs/WatchDoc.js';
import ListDoc from 'components/deriva/docs/ListDoc.js';
import UploadDoc from 'components/deriva/docs/UploadDoc.js';
import SignupComponent from 'components/deriva/user/signup.js';



// Start Pouchdb API

var remote_db = new PouchDB( window.__POUCHDB_SERVER__ , {skipSetup: true});
PouchDB.debug.enable('pouchdb:http');

PouchDB.adapter('worker', require('worker-pouch'));
PouchDB.plugin( PouchDBAuth );
remote_db.info().then( (info) => {
  render();
});

// Local sync
var local_db = new PouchDB('deriva')
local_db.sync( remote_db, {live: true, retry: true}).on('error', (e) => {
  console.log('sync error', e);
});


// webtorrent
let webtrrnt_client = new WebTorrent()






// Render the routing to the dom
function render(){
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
  ) , document.getElementById('app'));

  } catch (e) {
    console.error("Error on react render." , e.message);
    console.error(e);
  }
}

// Export for debugging
window.PouchDB = PouchDB
window.remote_db = remote_db;
window.local_db = local_db;

window.trrnt = webtrrnt_client;

window.React = React;
window.ReactDOM = ReactDOM;

window.dataModels =  dataModels;

window.App = App;
