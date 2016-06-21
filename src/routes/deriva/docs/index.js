
let docsRoute = {
  path: 'docs',

  getChildRoutes( location, cb ) {
    require.ensure([], (require) => {
      cb(null, [
        require('./watch.js'),
        require('./list.js'),
        require('./upload.js')
      ])
    }, 'docs');
  }

}

export default docsRoute;
module.exports = docsRoute;
