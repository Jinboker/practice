let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + 'main.ts',

  output: {
    path: __dirname + '/dist/',
    filename: 'bundle-[hash].js'
  },

  module: {
    loaders: [

    ]
  }
}