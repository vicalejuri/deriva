import config from 'config';
import store from './store';
import actions from './actions';
import models from './models';

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

// strict schema
let db = local_db;
models.setDbSchema( db );


window.PouchDB = PouchDB
window.remote_db = remote_db;
window.db = db;


window.start = function(){

  /*
   * Check connectivity to database
   */
  window.db.info().then( () => {
    // db successfully ready
    console.info('pouchdb is ready to rock');
    store.dispatch( actions.pouch.remotedbReady(window.db) );
  }).catch( (err) => {
    console.error("Could not connect at the moment to our database servers...", err);
    store.dispatch( actions.pouch.remotedbError(err) );
  });

};
window.start();
