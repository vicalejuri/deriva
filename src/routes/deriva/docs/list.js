
let listRoute = {
  path: 'list',
  // component: listDoc


  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/404.js'))
    },'components:deriva:docs:list')
  }

}

module.exports = listRoute;
