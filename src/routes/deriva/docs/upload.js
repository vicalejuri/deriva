
let uploadRoute = {
  path: 'upload',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/docs/UploadDoc'))
    },'components:deriva:docs:upload')
  }
}

module.exports = uploadRoute;
