const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[chunkhash].css',
    }),
    new CssoWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'production' unless process.env.NODE_ENV is defined
      // can be any process.env provided
    }),
    new BundleAnalyzerPlugin({ analyzerMode: process.env.NODE_ENV === 'analyze' ? 'server' : 'disabled' }),
  ]
})
