import { Doc , Channel } from './docs.js';
import _ from 'lodash'

let dataModels = function( database ){

  // Setup indexes and relations & shit
  let full_schema = [Doc,Channel].map( (doc) => {
    return doc.schema();
  });

  database.setSchema( full_schema )

  return {Doc, Channel};
};

export default dataModels;
