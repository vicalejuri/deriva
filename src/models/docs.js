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
Doc.schema = (db) => {
  return {
    singular: 'deriva/doc',
    plural:   'docs'
  }
  //db.createIndex({index: {fields: ['type','data.title']}});
}

/*
 * Channel
 *
   ["Antropologia", "Arqueologia", "Arquitetura", "Arte", "Astronomia", "Biologia", "Cinema", "Comida",
   "Computação", "Design", "Ecologia", "Economia", "Filosofia", "Física", "Geografia", "História",
   "Jornalismo", "Literatura", "Matemática", "Media", "Música", "Política", "Psicologia", "Química",
   "Religião", "Sociologia"]
   
 */
export class Channel {
  constructor(params){
    this.id = params.title;
    this.type = 'deriva/channel';

    this.title = params.title || ''
    this.subtitle = params.subtitle || ''
    this.tags = params.tags || []
    this.description = params.description || ''
    this.order = params.order || 0,
    this.color = params.color || '3FE20F'

    this.docs = params.docs || [];
  }
}

Channel.schema = (db) => {
  return {
    singular: 'deriva/channel',
    plural:   'deriva/channels',
    relations: {
      'docs': {hasMany: 'deriva/doc'}
    }
  }
  //db.createIndex({index: {fields: ['type','data.title']}})
}

export default Doc;
