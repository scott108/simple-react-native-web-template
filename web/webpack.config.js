const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const babelLoaderConfiguration = {
  test: /\.js$/,
  exclude: /node_modules/,
  loaders: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  }
};

// This is needed for webpack to import static images in JavaScript files
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};

module.exports = {
  entry: [
    path.join(__dirname, '../index.web.js'),
  ],
  output: {
    path: path.join(__dirname, '../assets'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      babelLoaderConfiguration,
      imageLoaderConfiguration
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'web/templates/index.html',
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.web.js', '.js'],
  }
};
