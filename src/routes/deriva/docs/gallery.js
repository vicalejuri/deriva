
let listRoute = {
  path: 'gallery',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/docs/gallery.jsx'))
    },'components:deriva:docs:gallery')
  }

}

module.exports = listRoute;
