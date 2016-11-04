'use strict';

import baseConfig from './base';
let packjson = require('../../package.json')

// Settings configured here will be merged into the final config object.
export default {
  appEnv: 'dev',  // feel free to remove the appEnv property here,
  appVersion: packjson.version,

  domain: 'localhost',
  port:   8000,

  // oembed proxy
  OEMBED_ENDPOINT:  'http://localhost:8061/oembed',
  OEMBED_API_KEY:   '123456789',

  // Pouchdb remote database
  POUCHDB_OFFLINE_ENABLED: true,
  POUCHDB_SERVER:   'http://localhost:3001/deriva-test',

  //POUCHDB_SERVER: 'ws://localhost:3001',

  // Youtube app Token
  DERIVA_YTUBE:     'AIzaSyA84xjydegSxJZz03yxgOG5dB48q0C1DSM'
}
