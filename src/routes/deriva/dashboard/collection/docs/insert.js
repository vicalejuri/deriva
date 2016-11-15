
let uploadRoute = {
  path: 'upload',
  component: { main: require('components/deriva/dashboard/collection/docs/list.jsx'),
               rightbar: require('components/deriva/dashboard/collection/docs/insert.jsx')}
}

module.exports = uploadRoute;
