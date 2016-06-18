import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;
window.ReactDOM = ReactDOM;

import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'

import { Provider } from 'react-redux';
import store from './store';
import actions from './actions';

import config from 'config';
import dataModels from 'models/index.js';

window.dataModels =  dataModels;
window.store = store;




// Start Pouchdb API
var remote_db = new PouchDB( config.POUCHDB_SERVER);
PouchDB.plugin( PouchDBAuth );
PouchDB.debug.enable('pouchdb:http');


//PouchDB.adapter('worker', require('worker-pouch'));
/*PouchDB.plugin( PouchDBAuth );
remote_db.info().then(() => {
  console.log("remotedb:ok");
  //store.dispatch( actions.remotedbReady(remote_db) );
});
*/

// Local sync
/*
var local_db = new PouchDB('user')
local_db.sync( remote_db, {live: true, retry: true}).on('error', (e) => {
  console.log('sync error', e);
});
*/
window.PouchDB = PouchDB
window.remote_db = remote_db;





/*
 * routes
 */
import { Router, match, Route, Link, browserHistory } from 'react-router';
import routes from './routes/root';

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

match({routes, location}, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('app')
  )
})





// Export for debugging

//window.trrnt = webtrrnt_client;
