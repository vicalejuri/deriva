
let profileRoute = {
  path: 'profile',
  // component: profileDoc


  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      let profileComponent = require('components/deriva/dashboard/profile');
      cb(null, { main: profileComponent })
    },'components:deriva:dashboard:profile')
  }

}

module.exports = profileRoute;
