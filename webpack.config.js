const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp('src');

//获取环境
const env = process.env.NODE_ENV;
const isDev = env === 'development';

const config = {
  devtool: isDev ? 'cheap-module-eval-source-map' : false,
  entry: resolveApp('src/index.ts'),
  output: {
    filename: `static/js/bundle${isDev ? '' : '.[chunkhash:8]'}.js`,
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
    alias: {
      '^src': appSrc,
      '^assets': path.resolve(appSrc, 'assets')
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        oneOf: [
          {
            test: /\.(png|ttf|mp3)\??.*$/,
            loader: 'url-loader',
            options: {
              limit: 80 * 1024,
              name: 'static/media/[name].[hash:8].[ext]',
            }
          },
          {
            test: /\.ts$/,
            include: appSrc,
            loader: require.resolve('ts-loader')
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: []
};

if (isDev) {
  config.devServer = {
    contentBase: appDirectory,
    port: 9000,
    open: true
  };
  config.plugins.push(
    new HtmlWebpackPlugin({
      title: 'battle-city'
    })
  )
} else {
  config.plugins.push(
    new HtmlWebpackPlugin({
      title: 'battle-city',
      minify: {
        collapseWhitespace: true,
        showErrors: true
      }
    }),
    new CleanWebpackPlugin([resolveApp('dist')]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
        drop_console: true,
        reduce_vars: true
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: false,
    }),
  );
}

module.exports = config;
