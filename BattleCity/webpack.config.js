module.exports = {
  entry: './src/entry.js',
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: { presets: ['es2015'] }
      }
    ]
  }
}