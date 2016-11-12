import _ from 'lodash';

import Doc from './docs.js';
import Channel from './channel.js';

let setDbSchema = (db) => {
  // Setup indexes and relations & shit
  let full_schema = _.toArray([Doc,Channel]).map( (doc) => {
    return doc._schema(db);
  });

  db.setSchema( full_schema )
}

export default {Doc, Channel, setDbSchema };
