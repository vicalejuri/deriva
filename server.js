/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');

let server = new WebpackDevServer(webpack(config), config.devServer)
.listen(config.port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }

  console.log('content base: ' + config.devServer.contentBase );
  console.log('Listening at localhost:' + config.port);
  console.log('Opening your system browser...');
  open('http://localhost:' + config.port + '/webpack-dev-server/');
});


/*
 * Start couchdb over websocket
 *
const PouchDB = require('pouchdb');
const PouchDBAuth = require('pouchdb-authentication');
const PouchSync = require('pouch-websocket-sync');
const http = require('http');

const server_db = http.createServer();

PouchDB.plugin( PouchDBAuth );
const wss = PouchSync.createServer(server_db, onRequest);

wss.on('error', function(err) {
  console.error(err.stack);
});

const db = new PouchDB(config.pouchDB.endpoint, {remote_name: config.pouchDB.remote_name});

server_db.listen(3001, function() {
  console.log((new Date()) + ' Server is listening on', server_db.address());
});

function onRequest(credentials, dbName, callback) {
  if (dbName == 'deriva') {
    callback(null, db);
  } else {
    callback(new Error('database not allowed'));
  }
}
*/
