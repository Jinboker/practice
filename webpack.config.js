const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "scss-loader"]
    }, {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [{loader: 'ts-loader'}]
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
