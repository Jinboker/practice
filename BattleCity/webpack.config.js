module.exports = {
  entry: './src/entry.ts',
  output: {
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader?presets[]=es2015!ts-loader"
      }
    ]
  }
}