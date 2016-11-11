let usersRoute = {
  path: 'users',

  childRoutes: [
    require('./profile.js'),
    require('./list.js')
  ],

  indexRoute: [
    require('./list.js')
  ]

}

module.exports = usersRoute;
