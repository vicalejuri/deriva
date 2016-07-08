
let collectionRoute = {
  path: 'collection',

  getChildRoutes( location, cb ) {
    require.ensure([], (require) => {
      cb(null, [
        require('./docs.js')
      ])
    },'collection')
  }
}

export default collectionRoute;
module.exports = collectionRoute;
