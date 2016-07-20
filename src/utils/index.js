import PouchDB from 'pouchdb';
import qs from 'querystring';
import config from 'config';

let utils = {};

//import ajax from 'pouchdb/extras/ajax';


utils.oembed = (url) => {
  let url_encoded = qs.stringify({url});
  console.log(`Using ${url} -> ${url_encoded}`);

  // Todo: use other xhr library, because
  // pouchdb will wrap error responses
  return fetch( `${config.OEMBED_ENDPOINT}?${url_encoded}`).then( (response) => {
    if(response.status == 200 || response.status == 0){
      return Promise.resolve(response.json());
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  });
};

let UUID_LENGTH = 8
utils.uuid = () => {
   throw "utils.uuid() Deprecated."
};


export default utils;
