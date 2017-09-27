var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DEV = path.resolve(__dirname, "dev");
var DIST = path.resolve(__dirname, "dist");
 
module.exports = {
  entry: [
    DEV + "/index.jsx",
    DEV + "/site.scss"
  ],
  devtool: "source-map",
  output: {
    path: DIST,
    filename: "iceandfire.js"
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        loaders: "babel-loader"
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css-loader!sass-loader")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("iceandfire.css", { allChunks: true }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("prod")
    }}),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.ejs'),
      path: DIST,
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    })
  ]
};
