let channelsRoute = {
  path: 'channels',

  childRoutes: [
    require('./edit.js')
  ],

  indexRoute: [
    require('./channels.js')
  ]

}

module.exports = channelsRoute;
