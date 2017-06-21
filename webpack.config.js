const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//    "server": "webpack-dev-server --devtool eval-source-map --progress --colors --hot --inline --content-base ./dev",

//设置输入和输出根目录
const ROOT_PATH = path.resolve(__dirname);
const DEV_PATH = path.resolve(ROOT_PATH, 'dev');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

//获取环境
// const env = process.env.NODE_ENV;

module.exports = {
  entry: './src/index.ts',
  output: {
    // path: env === 'dev' ? DEV_PATH : BUILD_PATH,
    path: DEV_PATH,
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-eval-source-map',
  // devtool: env === 'dev' ? 'cheap-module-eval-source-map' : 'hidden-source-map',
  devServer: {
    contentBase: DEV_PATH,
    hot: true,
    open: true,
    inline: true,
    port: 8008
    // port: 6000
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
        // use: ExtractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: [{
        //     loader: "css-loader"
        //   }, {
        //     loader: "sass-loader"
        //   }]
        // })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: 'url-loader?limit=30000'
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.ts', '.js', '.css', '.scss', '.sass'],
    alias: {
      'static': path.resolve(__dirname, './static'),
      'src': path.resolve(__dirname, './src')
    }
  },
  // watch: env === 'dev' ? true : false
  plugins: [
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({template: './index.html'})
  ]
};
//
//
// if (env === 'dev') {
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new HtmlWebpackPlugin({template: './index.html'})
//   ]);
// } else {
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new HtmlWebpackPlugin({
//       template: './index.html',
//       minify: {
//         removeComments: true,
//         collapseWhitespace: true,
//         showErrors: true
//       }
//     }),
//     new CleanPlugin([BUILD_PATH]),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false,
//         drop_console: true
//       },
//       comments: false,
//       beautify: false,
//       sourceMap: false
//     })
//   ]);
// }
