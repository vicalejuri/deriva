import config from 'config';
window.config = window.defaultConfig = config;


// Start Pouchdb API
import PouchDB from 'pouchdb'
import PouchDBAuth from 'pouchdb-authentication'
import PouchFind from 'pouchdb-find';
import PouchUpsert from 'pouchdb-upsert';
import PouchRelational from 'relational-pouch';

PouchDB.plugin( PouchFind );
PouchDB.plugin( PouchDBAuth );
PouchDB.plugin( PouchUpsert );
PouchDB.plugin( PouchRelational );
PouchDB.debug.enable('pouchdb:http');

// db sync
let remote_db = new PouchDB( config.POUCHDB_SERVER )
let local_db = undefined;

// Offline first
if(config.POUCHDB_OFFLINE_FIRST){
  //let local_db = new PouchDB('deriva')

  /*
   * Enable sync with remote
   *
  const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
  const clientEvents = ['connect', 'disconnect', 'reconnect'];

  console.log('Replicate REMOTE_DB to LOCAL_DB')
  remote_db.replicate.to(local_db, {live: true, filter: (doc) => {
    return doc.type === 'deriva/channel';
  }});
  remote_db.replicate.to(local_db, {live: true, filter: (doc) => {
    return doc.type === 'deriva/doc';
  }});
  */
} else {
  local_db = remote_db;
}


let db = local_db;
window.PouchDB = PouchDB
window.remote_db = remote_db;
window.db = db;


// load models and actions
import dataModels from 'models/index.js';
import actions from './actions';
window.actions = actions;
window.dataModels =  dataModels(window.db);


/*
 * Check connectivity to database
 */
window.db.info().then( () => {
  // db successfully ready
  console.info('pouchdb is ready to rock');
  store.dispatch( actions.remoteDbReady(window.db) );
}).catch( (err) => {
  console.error("Could not connect at the moment to our database servers...", err);
  store.dispatch( actions.remotedbError(err) );
});


// Create session store
import storeMaker from './store';
let store = storeMaker(window.db);
window.store = store;

console.log(window.store);

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

match({routes, location}, () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('container')
  )
});


// Export for debugging

//window.trrnt = webtrrnt_client;
export default window;
