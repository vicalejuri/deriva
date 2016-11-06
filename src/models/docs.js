/*
 * DataSources from parse-server
 */
import _ from 'lodash'

/*
 * Base document
 */
export class Doc {
  constructor(params){
    this.type = 'deriva/doc';

    this.title = params.title;
    this.url = params.url
    this.description = params.description
    this.type = params.type
    this.provider_name = params.provider_name
    this.oembed = params.oembed;
  }

}
Doc.schema = (db) => {
  if(db){
      //db.createIndex({index: {fields: ['type','data.title']}});
  }
  return {
    singular: 'deriva/doc',
    plural:   'deriva/docs',
    relations: {
      'channels': {hasMany: 'deriva/channel'}
    }
  }
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
  if(db){
      //db.createIndex({index: {fields: ['type','data.title']}});
  }

   return {
    singular: 'deriva/channel',
    plural:   'deriva/channels',
    relations: {
      'docs': {hasMany: 'deriva/doc'}
    }
  }
}

export default { Doc , Channel };
