const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//设置输入和输出根目录
const ROOT_PATH = path.resolve(__dirname);
const DEV_PATH = path.resolve(ROOT_PATH, 'dev');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

//获取环境
const env = process.env.NODE_ENV;

module.exports = {
  entry: './src/index.ts',
  output: {
    path: env === 'prod' ? BUILD_PATH : DEV_PATH,
    filename: 'bundle.js?[hash]'
  },
  devtool: env === 'prod' ? false : 'cheap-module-eval-source-map',
  devServer: {
    contentBase: ROOT_PATH,
    port: 8888
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        'test': /\.(jsx?)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              minimize: env === 'prod'
            }
          }, {
            loader: "sass-loader"
          }]
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: 'url-loader?limit=30000'
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
  plugins: [ new ExtractTextPlugin("style.css?[contenthash]") ]
};

if (env === 'prod') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        showErrors: true
      }
    }),
    new CleanPlugin([BUILD_PATH]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      comments: false,
      beautify: false,
      sourceMap: false
    })
  ]);
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({template: './index.html'})
  ]);
}
