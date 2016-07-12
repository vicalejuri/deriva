let listDocsRoute = {
  path: 'docs',
  
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      let listDocsComponent = require('components/deriva/dashboard/collection/docs/docs');
      console.log('getIndexRoute', listDocsComponent);
      cb(null, { main: listDocsComponent })
    },'components:deriva:dashboard:collection:docs:docs')
  }
}

module.exports = listDocsRoute;
