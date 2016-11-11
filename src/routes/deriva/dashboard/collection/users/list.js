let listUsersRoute = {
  path: 'list',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      let listUserComponent = require('components/deriva/dashboard/collection/users/list.jsx');
      cb(null, { main: listUserComponent })
    },'components:deriva:dashboard:collection:users:list')
  }
}

module.exports = listUsersRoute;
