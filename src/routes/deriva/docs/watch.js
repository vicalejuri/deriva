
let watchRoute = {
  path: 'watch/:docId',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/docs/Watch'))
    })
  }
}

module.exports = watchRoute;
