
let docsRoute = {
  path: 'docs',

  getChildRoutes( location, cb ) {
    require.ensure([], (require) => {
      cb(null, [
        require('./gallery.js'),
        require('./watch.js')
      ])
    }, 'docs');
  }

}

export default docsRoute;
module.exports = docsRoute;
