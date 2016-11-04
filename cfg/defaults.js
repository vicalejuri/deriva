'use strict';
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;

var webpack = require('webpack');
var postcssImport = require('postcss-import');
var autoPrefixer = require('autoprefixer');
var precss = require('precss');

function getDefaultModules() {
  return {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    preLoaders: [{
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader?sourceMap'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax&sourceMap'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&sourceMap'
      },
      {
          test   : /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader : 'file-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg)$/,
        loader: 'file-loader'
      }
    ]
  };
}
module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  postcss: function () {
    return [precss(),
            postcssImport({ addDependencyTo: webpack}),
            autoprefixer({   browsers: ['last 2 versions', 'ie >= 8' ]}), ]
  }
};
