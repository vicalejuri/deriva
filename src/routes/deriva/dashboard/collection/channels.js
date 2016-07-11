let channelsRoute = {
  path: 'channels',
  // component: profileDoc

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      let listDocsComponent = require('components/deriva/dashboard/collection/channels');
      cb(null, { main: listDocsComponent })
    },'components:deriva:dashboard:collection:channels')
  }

}

module.exports = channelsRoute;
