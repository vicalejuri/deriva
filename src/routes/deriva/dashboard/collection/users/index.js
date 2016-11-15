import actions from 'actions';
import models from 'models';
import { connect } from 'react-redux'

// connect component to its Model/doctype and actions
let CollectionComponent = require('components/deriva/dashboard/collection/collection.jsx');
let EditComponent       = require('components/deriva/dashboard/collection/edit.jsx');

let UserCollection = connect( (state) => {
  return {doc_type:   'user',
          model:      models.User ,

          // Action Creators for the given doc_type/model
          actions: {  'INSERT': actions.user.signup,
                      'REMOVE': actions.user.admin_ban_user,
                      'FIND':   actions.user.admin_list_users },

          filter: {
            'id': true,
            'name': true,
            'email': true
          }}
})(CollectionComponent);


let UserEdit = connect( (state) => {
  return {doc_type: 'user',
          model:    models.User,

          // Action Creators for the given doc_type/model
          actions: { 'INSERT': actions.user.signup,
                     'REMOVE': actions.user.admin_ban_user,
                     'FIND':   actions.user.admin_list_users },

         }
})(EditComponent);



let usersRoute = {
  path: 'user',

  childRoutes: [
    { path: 'edit/(:doc_id)',
      component: { main: UserCollection,
                   rightbar: UserEdit }
    }
  ],

  indexRoute: [{
    component: { main:  UserCollection },
  },]

}

module.exports = usersRoute;
