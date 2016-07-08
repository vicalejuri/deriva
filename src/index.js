import React from 'react';
import ReactDOM from 'react-dom';

window.React = React;
window.ReactDOM = ReactDOM;

import { Provider } from 'react-redux';
import storeMaker from './store';
import actions from './actions';

import config from 'config';
window.config = window.defaultConfig = config;




// Start Pouchdb API
import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'
import PouchSync from 'pouch-websocket-sync'
import PouchFind from 'pouchdb-find';

PouchDB.plugin( PouchFind );
PouchDB.plugin( PouchDBAuth );
PouchDB.debug.enable('pouchdb:http');

// Local sync
let local_db = new PouchDB('docs')
let remote_db = new PouchDB( config.POUCHDB_SERVER )

/*
let sync_client = new PouchSync.createClient()
let sync = sync_client.connect( config.POUCHDB_SERVER )
                      .on('error', (err) => {
                        console.error(err);
                      })
                      .sync(local_db, {remote_name: config.POUCHDB_REMOTE_NAME});
*/

const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
const clientEvents = ['connect', 'disconnect', 'reconnect'];

let sync = PouchDB.sync( remote_db, local_db, {live: true, retry: true});

syncEvents.forEach( (ev) => {
  sync.on(ev, (info) => {
    if(ev == 'change'){
      console.log( `sync:${ev} --> ${info}`, info)
    }
    //store.dispatch({type: actions.SET_SYNC_STATE, data: ev});
  })
});

/*{}
clientEvents.forEach( (ev) => {
  sync_client.on(ev, () => {
    store.dispatch({type: actions.SET_SYNC_STATE, data: ev});
  })
});
*/


window.PouchDB = PouchDB
window.remote_db = remote_db;
window.db = local_db;


// load models
import dataModels from 'models/index.js';
window.dataModels =  dataModels(window.db);


// Create session store
let store = window.store = storeMaker(window.db);





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
