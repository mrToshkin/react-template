const path = require('node:path')

const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const DeadCodePlugin = require('webpack-deadcode-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve('public'),
      watch: true,
    },
    client: {
      overlay: false,
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new webpack.WatchIgnorePlugin({
      paths: [/scss\.d\.ts$/, /(test|snap)\.(ts|tsx)$/],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new DeadCodePlugin({
      patterns: ['src/**/*.(ts|tsx|css)'],
      exclude: ['**/*.(test|snap|utils|hooks).(ts|tsx)', 'src/shared/api/**/*'],
      log: 'unused',
    }),
    new ESLintPlugin({
      cache: true,
      cacheLocation: './node_modules/.cache/',
      extensions: ['ts', 'tsx'],
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      // can be any process.env provided
    }),
  ],
})
