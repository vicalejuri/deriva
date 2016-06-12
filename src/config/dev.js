'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here,

  OEMBED_ENDPOINT:  'http://localhost:8061/oembed',
  OEMBED_API_KEY:   '123456789',

  POUCHDB_SERVER:   'http://localhost:5984/deriva',
  DERIVA_YTUBE:     'AIzaSyA84xjydegSxJZz03yxgOG5dB48q0C1DSM'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
