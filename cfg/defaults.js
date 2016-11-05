'use strict';
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;

var webpack = require('webpack');
var postcssImport = require('postcss-import');
var autoPrefixer = require('autoprefixer');
var precss = require('precss');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

//loaders: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&modules&importLoaders=1!postcss-loader')

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
        //loader: 'style-loader!css-loader!postcss-loader?sourceMap'
        loader: ExtractTextPlugin.extract('style-loader?insertAt=top&-singleton','!css-loader?sourceMapimportLoaders=1!postcss-loader!sass-loader')
      },
      {
        test: /\.sass/,
        loader: ExtractTextPlugin.extract('style-loader?insertAt=top&-singleton','!css-loader?sourceMap&importLoaders=1!postcss-loader!sass-loader')
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('style-loader?insertAt=top&-singleton','!css-loader?sourceMap&importLoaders=1!postcss-loader!sass-loader')
                                          // fallbackLoader: 'css-loader!postcss-loader?sourceMap&modules&importLoaders=1'})
      },
      {
          test   : /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader : 'url-loader'
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
    return [
            postcssImport({ addDependencyTo: webpack}),
            autoprefixer({   browsers: ['last 2 versions', 'ie >= 8' ]}), ]
  }
};
