const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * This is not optimal for a real life project, should have at least 2 config, dev and prod:
 * - Source maps shouldn't be publicly served in prod
 * - MiniCssExtractPlugin shouldn't be used for dev
 * - Should use hashes and HtmlWebpackPlugin to hash bundles for prod. I had problems setting this
 *   up :( so I decided not to include them
 */
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/env'] },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
};
