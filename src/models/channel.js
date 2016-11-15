import _ from 'lodash'

/*
 * Channel
 */
export class Channel {
  constructor(params=new Map()){
    this.id = _.kebabCase(params.id || params.title || '');
    this.type = 'channel';
    if(params.rev){
      this.rev = params.rev;
    }

    this.title = params.title || '';
    this.subtitle = params.subtitle || '';
    this.tags = params.tags || [];
    this.description = params.description || '';
    this.color = params.color || '3FE20F';
    this.category = params.category || ['Sem Categoria',];

    this.docs = params.docs || [];
  }
}

/*
 * Relationships
 */
Channel._schema = (db) => {
  if(db){
      //db.createIndex({index: {fields: ['type','data.title']}});
  }

   return {
    singular: 'channel',
    plural:   'channels',
    relations: {
      'docs': {hasMany: 'doc'}
    }
  }
}

/*
 * Form and data visualization
 */
Channel._form = {
    category: {
      type:   'select',
      options: _.map(["Antropologia", "Arqueologia", "Arquitetura", "Arte", "Astronomia", "Biologia", "Cinema", "Comida",
   "Computação", "Design", "Ecologia", "Economia", "Filosofia", "Física", "Geografia", "História",
   "Jornalismo", "Literatura", "Matemática", "Media", "Música", "Política", "Psicologia", "Química",
   "Religião", "Sociologia","Sem Categoria"], (c) => { return {label: c, value: c}  })
    },
    docs: {
      type: 'tags'
    }
}

export default Channel;
