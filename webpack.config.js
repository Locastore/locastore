var path = require('path');
var webpack = require('webpack');

var comp_dir = path.join(__dirname, '/client/components');
var dist_dir = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${comp_dir}/index.jsx`,
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
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: dist_dir
  }
}
