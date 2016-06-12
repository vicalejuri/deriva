import PouchDB from 'pouchdb';
import qs from 'querystring';
import config from 'config';

let utils = {};

import ajax from 'pouchdb/extras/ajax';

utils.oembed = (url, cb) => {
  let url_encoded = qs.stringify({url});
  console.log(`Using ${url} -> ${url_encoded}`);

  // Todo: use other xhr library, because
  // pouchdb will wrap error responses
  ajax({url: `${config.OEMBED_ENDPOINT}?${url_encoded}`,
                withCredentials: false},
  (e, r) => {
      cb(e,r);
  });
};

let UUID_LENGTH = 8
utils.uuid = () => {
  return PouchDB.utils.uuid( UUID_LENGTH );
};

export default utils;
