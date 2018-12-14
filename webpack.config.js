const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    'data-analysis': './data-analysis.jsx'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/www/scripts'
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
  },
  module: {
    rules: [
      // jsx
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      // styles
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      // images
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }
    ]
  },
};
