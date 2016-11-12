let channelsRoute = {
  path: 'channels',
  // component: profileDoc
  childRoutes: [
    require('./edit.js')
  ],

  indexRoute: [
    require('./channels.js')
  ]

}

module.exports = channelsRoute;
