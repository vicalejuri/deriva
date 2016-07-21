
let uploadRoute = {
  path: 'upload',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null,  { main: require('components/deriva/dashboard/collection/docs/docs'),
                  rightbar: require('components/deriva/dashboard/collection/docs/insert')});
    },'components:deriva:dashboard:collection:docs:insert')
  }
}

module.exports = uploadRoute;
