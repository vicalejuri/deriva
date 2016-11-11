
let uploadRoute = {
  path: 'upload',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null,  { main: require('components/deriva/dashboard/collection/docs/list.jsx'),
                  rightbar: require('components/deriva/dashboard/collection/docs/insert.jsx')});
    },'components:deriva:dashboard:collection:docs:insert')
  }
}

module.exports = uploadRoute;
