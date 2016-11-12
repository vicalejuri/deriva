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
Doc._schema = (db) => {
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

export default Doc;
