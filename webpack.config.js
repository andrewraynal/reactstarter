var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
  filename: 'scss/styles.css'
});

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: [
      './main.js'
    ],
    output: {
      path: path.join(__dirname, 'www'),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader'
          }]
        },
        {
          test: /\.scss$/,
          use: extractPlugin.extract({
            use: ['css-loader', 'sass-loader']
          })
        }]
      },
      plugins: [
        extractPlugin
      ]
    };
