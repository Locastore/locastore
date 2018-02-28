var path = require('path');
var webpack = require('webpack');
var comp_dir = path.join(__dirname, '/client/components');
var dist_dir = path.join(__dirname, '/client/dist');
module.exports = {
  devtool: 'inline-source-map',
  entry: `${comp_dir}/Index.jsx`,
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {}
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: dist_dir
  }
}