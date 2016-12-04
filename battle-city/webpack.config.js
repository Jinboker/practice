let webpack = require('webpack');

module.exports = {
  entry: __dirname + '/src/main.ts',

  output: {
    filename: 'bundle-[hash].js',
    path: __dirname + '/dist'
  },

  devServer: {
    contentBase: "./dist",
    colors: true,
    port: 239,
    historyApiFallback: true,
    inline: true
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'}
    ]
  },

  plugins: [
    // 这个插件是用来添加头部信息的
    new webpack.BannerPlugin("Copyright Flying Unicorns inc."),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin()
  ]
}
