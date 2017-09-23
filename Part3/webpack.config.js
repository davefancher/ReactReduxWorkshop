var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "dev");
var DIST = path.resolve(__dirname, "dist");
 
module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    DEV + "/index.jsx",
    DEV + "/site.scss"
  ],
  devtool: "inline-source-maps",
  output: {
    path: DIST,
    filename: "iceandfire.js",
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        include: path.join(__dirname, 'dev'),
        loaders: "babel-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]        
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("debug")
    }})
  ]
};
