let channelsRoute = {
  path: 'channels',
  // component: profileDoc
  childRoutes: [
    require('./upload.js')
  ],

  indexRoute: [
    require('./channels.js')
  ]

}

module.exports = channelsRoute;
