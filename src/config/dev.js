'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here,

  domain: 'localhost',
  port:   8000,

  // oembed proxy
  OEMBED_ENDPOINT:  'http://localhost:8061/oembed',
  OEMBED_API_KEY:   '123456789',

  // Pouchdb remote database
  POUCHDB_OFFLINE_ENABLED: false,
  POUCHDB_SERVER:   'http://localhost:3001/docs',

  //POUCHDB_SERVER: 'ws://localhost:3001',

  // Youtube app Token
  DERIVA_YTUBE:     'AIzaSyA84xjydegSxJZz03yxgOG5dB48q0C1DSM'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
