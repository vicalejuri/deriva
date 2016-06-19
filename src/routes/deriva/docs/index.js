
let docsRoute = {
  path: 'docs',
  getChildRoutes( location, callback ) {
    require.ensure([], (require) => {
      callback(null, [
        require('./watch.js'),
        require('./list.js'),
        require('./upload.js'),
      ])
    });
  }

}

export default docsRoute;
module.exports = docsRoute;
