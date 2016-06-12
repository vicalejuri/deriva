import PouchDB from 'pouchdb';
import qs from 'querystring'
let utils = {};

import ajax from 'pouchdb/extras/ajax';

utils.oembed = (url, cb) => {
  let url_encoded = qs.stringify({url});
  console.log(`Using ${url} -> ${url_encoded}`);

  // Todo: use other xhr library, because
  // pouchdb will wrap error responses
  ajax({url: `${window.__OEMBED_ENDPOINT__}?${url_encoded}`,
                withCredentials: false},
  (e, r) => {
      cb(e,r);
  });
  /*
  PouchDB.utils.ajax({url: `${window.__OEMBED_ENDPOINT__}?${url_encoded}`,
                withCredentials: false},
  (e, r) => {
      cb(e,r);
  });
  */
};

let UUID_LENGTH = 8
utils.uuid = () => {
  return PouchDB.utils.uuid( UUID_LENGTH );
};

export default utils;
