
let watchRoute = {
  path: 'watch/:docId',
  // component: require('components/deriva/docs/WatchDoc'),
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/docs/Watch'))
    })
  }
}

module.exports = watchRoute;
