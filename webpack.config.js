var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/js/main.jsx',
  output: { path: __dirname, filename: 'dist/js/main.js' },
  resolve: { extensions: [".js", ".json", ".jsx"] },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
