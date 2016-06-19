
let uploadRoute = {
  path: 'upload',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/docs/UploadDoc'))
    })
  }
}

export default uploadRoute;
module.exports = uploadRoute;
