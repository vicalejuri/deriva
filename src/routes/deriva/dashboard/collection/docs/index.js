let docsRoute = {
  path: 'docs',

  childRoutes: [
    require('./upload.js'),
    require('./import.js')
  ],

  indexRoute: [
    require('./docs.js')
  ]

}

module.exports = docsRoute;
