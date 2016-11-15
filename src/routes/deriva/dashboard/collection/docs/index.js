import actions from 'actions';
import models from 'models';
import { connect } from 'react-redux'

// connect component to its Model/doctype and actions
let CollectionComponent = require('components/deriva/dashboard/collection/collection.jsx');
let EditComponent       = require('components/deriva/dashboard/collection/edit.jsx');

let DocCollection = connect( (state) => {
  return {doc_type:   'doc',
          model:      models.Doc ,

          // Action Creators for the given doc_type/model
          actions: {  'INSERT': actions.docs.insert,
                      'REMOVE': actions.docs.remove,
                      'FIND':   actions.docs.find_all },

          tools: [<div className="btn btn-warning" onClick={() => {
                    window.store.dispatch( actions.ui.navigate('/dashboard/collection/doc/import'));
                  }}>Import</div>,],

          filter: {
            'id': true,
            'title': true,
            'subtitulo': (obj) => {
              return obj.title + ':' + obj.subtitle
            }
          }}
})(CollectionComponent);


let DocEdit = connect( (state) => {
  return {doc_type: 'doc',
          model:    models.Doc,

          // Action Creators for the given doc_type/model
          actions: { 'INSERT': actions.docs.insert,
                     'REMOVE': actions.docs.remove,
                     'FIND':   actions.docs.find },

         }
})(EditComponent);



let docsRoute = {
  path: 'doc',

  childRoutes: [
    { path: 'edit/(:doc_id)',
      component: { main: DocCollection,
                   rightbar: DocEdit }
    },
    {
      path: 'import',
      component: { main:      DocCollection,
                   rightbar:  require('components/deriva/dashboard/collection/docs/_import.jsx') }
    }
  ],

  indexRoute: [{
    component: { main:  DocCollection },
  },]

}

module.exports = docsRoute;
