
let profileRoute = {
  path: 'profile/:userName',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      let listComponent = require('components/deriva/dashboard/collection/users/list');
      let profileComponent = require('components/deriva/dashboard/collection/users/profile');
      cb(null, { main: listComponent ,
                 rightbar: profileComponent})
    },'components:deriva:dashboard:collection:users:profile')
  }

}

module.exports = profileRoute;
