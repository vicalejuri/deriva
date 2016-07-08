
let uploadRoute = {
  path: 'upload',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/docs/Upload'))
    },'components:deriva:docs:upload')
  }
}

module.exports = uploadRoute;
