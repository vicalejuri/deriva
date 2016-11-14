
let docsRoute = {
  path: 'docs',

  childRoutes: [
    require('./gallery.js'),
    require('./watch.js')
  ]

}

export default docsRoute;
module.exports = docsRoute;
