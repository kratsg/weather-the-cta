var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/main.jsx',
  output: { path: __dirname, filename: 'dist/main.js' },
  resolve: { extensions: [".js", ".json", ".jsx"] },
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
