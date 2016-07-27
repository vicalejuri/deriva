'use strict';

import baseConfig from './base';
let packjson = require('../../package.json')

let config = {
  appEnv: 'dist',
  appVersion: packjson.version,

  OEMBED_ENDPOINT:  'http://localhost:8061/oembed',
  OEMBED_API_KEY:   '123456789',

  // Pouchdb remote database
  POUCHDB_OFFLINE_ENABLED: true,
  POUCHDB_SERVER:   'http://localhost:3001/deriva-test',
};

export default Object.freeze(Object.assign({}, baseConfig, config));
