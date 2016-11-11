
let uploadRoute = {
  path: 'upload',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null,  {
                  main: require('components/deriva/dashboard/collection/channels/list'),
                  rightbar: require('components/deriva/dashboard/collection/channels/upload')});
    },'components:deriva:dashboard:collection:channels:upload')
  }
}

module.exports = uploadRoute;
