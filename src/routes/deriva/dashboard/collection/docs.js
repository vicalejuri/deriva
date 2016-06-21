let docsRoute = {
  path: 'docs',
  // component: profileDoc

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      let listDocsComponent = require('components/deriva/dashboard/collection/docs');
      cb(null, { main: listDocsComponent })
    },'components:deriva:dashboard:collection:docs')
  }

}

module.exports = docsRoute;
