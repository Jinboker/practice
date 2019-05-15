const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'production';

const config = {
  mode: env,
  entry: './src/index.ts',
  output: {
    filename: `index${env === 'development' ? '' : '.[chunkhash:8]'}.js`,
  },
  module: {
    rules: [
      {
        test: /\.(png|ttf|mp3)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 80 * 1024,
          name: 'assets/[name].[hash:8].[ext]',
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
    alias: {
      'src': path.resolve(__dirname, 'src'),
    }
  },
  plugins: []
};

if (env === 'development') {
  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
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
    })
  )
}

module.exports = config;
