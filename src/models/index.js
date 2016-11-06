import models from './docs.js';
import _ from 'lodash';

let setDbSchema = (db) => {
  // Setup indexes and relations & shit
  let full_schema = _.toArray(models).map( (doc) => {
    return doc.schema(db);
  });

  db.setSchema( full_schema )
}

export default {models, setDbSchema };
