
let listRoute = {
  path: 'gallery',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/docs/Gallery'))
    },'components:deriva:docs:gallery')
  }

}

module.exports = listRoute;
