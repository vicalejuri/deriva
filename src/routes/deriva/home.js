
let homeRoute = {

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/deriva/Home'))
    },'components:deriva:home')
  }

}

module.exports = homeRoute;
