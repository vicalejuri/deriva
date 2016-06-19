'use strict';

let path = require('path');
let webpack = require('webpack');
let packjson = require('../package.json');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

let HtmlWebpackPlugin = require('html-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    'app':    path.join(__dirname, '../src/index' ),
    'vendor': ['lodash','react','react-dom','redux','react-redux',
               'tweetnacl','pouchdb','pouchdb-authentication']
  },
  cache: true,
  devtool: 'sourcemap',
  plugins: [
    new HtmlWebpackPlugin({
      version: packjson.version,
      template: path.join(__dirname , '../src/index.ejs')
    }),
    new HtmlWebpackPlugin({
      version: packjson.version,
      filename: baseConfig.output.path + '/index.html',
      template: path.join(__dirname , '../src/index.ejs')
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor","vendor.bundle.js"),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: defaultSettings.getDefaultModules(),
  output: {
    path: baseConfig.output.path + 'assets/v'+packjson.version+ '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    update: true,
    publicPath: '/assets/v'+ packjson.version + '/'
  },
}
);

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
