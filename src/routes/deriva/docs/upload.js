
let uploadRoute = {
  path: 'upload',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/docs/upload.jsx'))
    },'components:deriva:docs:upload')
  }
}

module.exports = uploadRoute;
