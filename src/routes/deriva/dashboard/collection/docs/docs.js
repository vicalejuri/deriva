let CollectionComponent = require('components/deriva/dashboard/collection/collection.jsx');

import actions from 'actions';
import models from 'models';
import { connect } from 'react-redux'

let comp = connect( (state) => {
  return {doc_type:   'doc',
          model:      models.Doc ,

          // Action Creators for the given doc_type/model
          actions_hook: { 'INSERT': actions.docs.insert,
                         'REMOVE': actions.docs.remove,
                         'FIND':   actions.docs.find_all },

          filter: {
            'id': true,
            'url': true,
            'title': true,
            'subtitulo': (obj) => {
              return obj.title + ':' + obj.url
            }
          }}
})(CollectionComponent);


let listDocsRoute = {
  path: 'docs',
  component: { main:  comp },
}

module.exports = listDocsRoute;
