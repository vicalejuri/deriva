
let profileRoute = {
  path: 'profile',
  // component: profileDoc


  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      let profileComponent = require('components/deriva/dashboard/collection/users/profile');
      cb(null, { main: profileComponent })
    },'components:deriva:dashboard:collection:users:profile')
  }

}

module.exports = profileRoute;
