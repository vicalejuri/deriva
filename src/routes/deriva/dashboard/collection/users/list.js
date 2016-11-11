let listUsersRoute = {
  path: 'list',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      let listUserComponent = require('components/deriva/dashboard/collection/users/list');
      cb(null, { main: listUserComponent })
    },'components:deriva:dashboard:collection:users:list')
  }
}

module.exports = listUsersRoute;
