const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: 'url-loader?limit=30000'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "source-map-loader"
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8888,
    inline: true,
    colors: true
  },
  // 不写这个可能会出现说找不到node的某些个模块
  target: 'node',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: '/node_modules/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        showErrors: true
      }
    }),
    new ExtractTextPlugin("style.css")
  ]
};
