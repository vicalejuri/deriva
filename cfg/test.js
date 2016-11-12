'use strict';

let path = require('path');
let srcPath = path.join(__dirname, '/../src/');

let baseConfig = require('./base');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = Object.assign({}, baseConfig, {
  devtool: 'eval',
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'isparta-instrumenter-loader',
        include: [
          path.join(__dirname, '/../src')
        ]
      }
    ],
    loaders: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [].concat(
          baseConfig.additionalPaths,
          [
            path.join(__dirname, '/../src'),
            path.join(__dirname, '/../test')
          ]
        )
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    alias: Object.assign({}, baseConfig.resolve.alias , {
      helpers: path.join(__dirname, '/../test/helpers'),
    })
  },
  plugins: [
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ]
});
