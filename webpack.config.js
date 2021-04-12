const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

module.exports = {
  entry: {
    'ng-apphub-service': './src/index.js'
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  externals: ['angular'],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{ loader: "babel-loader" }]
      }
    ]
  }
};
