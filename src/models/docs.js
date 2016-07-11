/*
 * DataSources from parse-server
 */
import PouchDB from 'pouchdb'
import utils from 'utils/index.js'
import _ from 'lodash'

/*
 * Base document
 */
export class Doc {
  constructor(params){
    this._id =   utils.uuid();
    this.type = 'deriva/doc';
    this.data = params;
  }

}
Doc.setup = (db) => {
  db.createIndex({index: {fields: ['type','data.title']}});

}

/*
 * Channel
 */
export class Channel {
  constructor(params){
    this._id = params.title;
    this.type = 'deriva/channel';
    this.data = {
      title: 'Psycology',
      subtitle: 'Psycology and mind studies',
      color: '3FE20F'
    };
  }
}

Channel.setup = (db) => {
  db.createIndex({index: {fields: ['type','data.title']}})
}

export default Doc;
