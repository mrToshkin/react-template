const path = require('node:path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const globalCssPaths = []

module.exports = {
  entry: path.resolve('src/index.tsx'),
  output: {
    filename: '[name].bundle.[contenthash].js',
    path: path.resolve('dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    modules: [path.resolve('src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
  },
  stats: 'minimal',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React шаблон',
      template: path.resolve('public/index.html'),
      filename: 'index.html',
      favicon: 'public/favicon.svg',
    }),
    // new CleanWebpackPlugin(), // заменяется output.clean: true
    // new CopyPlugin({
    //   patterns: [
    //     // { from: "src/6.shared/fonts", to: "fonts" },
    //   ],
    // }),
  ],
  module: { rules: [
    {
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loader: 'url-loader',
      options: {
        outputPath: 'assets/images',
        name: '[name].[ext]',
      },
    },
    {
      test: /\.(ttf|woff|woff2)$/i,
      loader: 'url-loader',
      options: {
        outputPath: 'assets/fonts',
        name: '[name].[ext]',
      },
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        isProd ? MiniCssExtractPlugin.loader : "style-loader",
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: isProd
                  ? "[hash:base64:5]"
                  : "[folder]__[local]--[hash:base64:5]",
              auto: resourcePath => !globalCssPaths.some(cssPath => resourcePath.includes(path.normalize(cssPath))),
            },
          },
        },
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [path.resolve('src/', '6.shared/sass/_index.scss')]
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [isProd ? 'autoprefixer' : undefined],
            },
          },
        },
      ],
    }
  ]},
}
