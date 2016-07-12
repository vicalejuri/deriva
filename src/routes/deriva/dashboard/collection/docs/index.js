let docsRoute = {
  path: 'docs',

  childRoutes: [
    require('./upload.js')
  ],

  indexRoute: [
    require('./docs.js')
  ]

}

module.exports = docsRoute;
