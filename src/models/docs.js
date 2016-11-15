/*
 * DataSources from parse-server
 */
import _ from 'lodash'

/*
 * Base document
 */
export class Doc {
  constructor(params=new Map()){
    this.type = 'doc';
    if(params.rev){
      this.rev = params.rev;
    }

    this.title = params.title || '';
    this.url = params.url || '';
    this.description = params.description || '';
    this.provider_name = params.provider_name || '';
    this.oembed = params.oembed || {};
  }

}
Doc._schema = (db) => {
  if(db){
      //db.createIndex({index: {fields: ['type','data.title']}});
  }
  return {
    singular: 'doc',
    plural:   'docs',
    relations: {
      'channels': {hasMany: 'channel'}
    }
  }
}

export default Doc;
