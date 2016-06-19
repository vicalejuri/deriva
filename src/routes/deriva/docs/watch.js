
let watchRoute = {
  path: 'watch/:docId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/docs/WatchDoc'))
    })
  }
}

export default watchRoute;
module.exports = watchRoute;
