'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let packjson = require('../package.json');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

let ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    'lib1': ['react','react-dom','redux','react-redux','lodash'],
    'lib2': [ 'tweetnacl','pouchdb','pouchdb-authentication',
              'pouchdb-upsert', 'pouchdb-find','relational-pouch' ],
    'app': ['webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
           'webpack/hot/only-dev-server',
           './src/index'],
    'db': ['./src/db',]
  },
  cache: true,
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      version: packjson.version,
      inject: true,
      template: path.join(__dirname , '../src/index.ejs'),
      alwaysWriteDoDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),

    new ExtractTextPlugin('main.css', { allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin("lib1","vendor.bundle.js"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),

  ],
  module: defaultSettings.getDefaultModules(),
  output: {
    path: baseConfig.output.path ,
    filename: '[name].js',
    chunkFilename: '[name].js',
    update: true,
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: '/'
  }
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
