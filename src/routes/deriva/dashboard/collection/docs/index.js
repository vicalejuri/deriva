let docsRoute = {
  path: 'docs',

  childRoutes: [
    require('./insert.js'),
    require('./import.js')
  ],

  indexRoute: [
    require('./docs.js')
  ]

}

module.exports = docsRoute;
