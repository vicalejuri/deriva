
let collectionRoute = {
  path: 'collection',

  getChildRoutes( location, cb ) {
    require.ensure([], (require) => {
      cb(null, [
        require('./docs.js'),
        require('./channels.js')
      ])
    },'collection')
  }
}

export default collectionRoute;
module.exports = collectionRoute;
