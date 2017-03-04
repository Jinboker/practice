module.exports = {
  devtool: 'eval-source-map',
  entry: './src/entry.js',
  output: {
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitError: true,
          failOnError: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}