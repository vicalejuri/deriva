
let uploadRoute = {
  path: 'upload',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null,  { main: require('components/deriva/dashboard/collection/docs/docs'),
                  rightbar: require('components/deriva/dashboard/collection/docs/upload')});
    },'components:deriva:dashboard:collection:docs:upload')
  }
}

module.exports = uploadRoute;
