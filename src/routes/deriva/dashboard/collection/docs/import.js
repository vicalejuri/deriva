
let importRoute = {
  path: 'import',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null,  {
                  main: require('components/deriva/dashboard/collection/docs/list.jsx'),
                  rightbar: require('components/deriva/dashboard/collection/docs/_import.jsx')});
    },'components:deriva:dashboard:collection:docs:import')
  }
}

module.exports = importRoute;
