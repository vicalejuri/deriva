
let editRoute = {
  path: 'edit/(:channel_id)',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null,  {
                  main: require('components/deriva/dashboard/collection/channels/list.jsx'),
                  rightbar: require('components/deriva/dashboard/collection/channels/edit.jsx')});
    },'components:deriva:dashboard:collection:channels:upload')
  }
}

module.exports = editRoute;
