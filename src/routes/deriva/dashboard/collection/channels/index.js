import actions from 'actions';
import models from 'models';
import { connect } from 'react-redux'

// connect component to its Model/doctype and actions
let CollectionComponent = require('components/deriva/dashboard/collection/collection.jsx');
let EditComponent       = require('components/deriva/dashboard/collection/edit.jsx');

let ChannelCollection = connect( (state) => {
  return {doc_type:   'channel',
          model:      models.Channel ,

          // Action Creators for the given doc_type/model
          actions: { 'INSERT': actions.channels.insert,
                         'REMOVE': actions.channels.remove,
                         'FIND':   actions.channels.find_all },

          filter: {
            'id': true,
            'title': true,
            'subtitulo': (obj) => {
              return obj.title + ':' + obj.subtitle
            }
          }}
})(CollectionComponent);


let ChannelEdit = connect( (state) => {
  return {doc_type: 'channel',
          model:    models.Channel,

          // Action Creators for the given doc_type/model
          actions: { 'INSERT': actions.channels.insert,
                         'REMOVE': actions.channels.remove,
                         'FIND':   actions.channels.find },

         }
})(EditComponent);



let channelsRoute = {
  path: 'channel',

  childRoutes: [
    { path: 'edit/(:doc_id)',
      component: { main: ChannelCollection,
                   rightbar: ChannelEdit }
    },
  ],

  indexRoute: [
    { path: 'channels',
     component: { main:  ChannelCollection },
    },
  ]

}

module.exports = channelsRoute;
