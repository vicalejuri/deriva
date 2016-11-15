
let importRoute = {
  path: 'import',
  component: { main: require('components/deriva/dashboard/collection/docs/list.jsx'),
               rightbar: require('components/deriva/dashboard/collection/docs/_import.jsx')
  }
}

module.exports = importRoute;
