/* eslint-disable flowtype/require-parameter-type */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// WEBPACK DOCS
//  https://webpack.js.org/concepts/

module.exports = env => {
  // add environment keys in the command line
  // these will replace process.env.{VARIABLE} lines in the code
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return {
    /*
    An entry point indicates which module webpack should use
     to begin building out its internal dependency graph.
      webpack will figure out which other modules and libraries
       that entry point depends on (directly and indirectly).
  */
    entry: './src/index.js',
    /*
    The output property tells webpack where to emit the bundles
     it creates and how to name these files. It defaults
      to ./build/main.js for the main output file and to
       the ./build folder for any other generated file.
  */
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'build'),
      /*
      Here, can point the project content to be served @ '/dashboard'
      instead of '/' if desired...
    */
      publicPath: env.MODE === 'production' ? '/app/' : '/'
    },
    module: {
      rules: [
        //  https://github.com/babel/babel-loader
        // This package allows transpiling JavaScript files using Babel and webpack.
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },

        // https://github.com/webpack-contrib/html-loader
        // Exports HTML as string. HTML is minimized when the compiler demands.

        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true }
            }
          ]
        },

        // https://github.com/webpack-contrib/css-loader
        // The css-loader interprets @import and url() like import/require() and will resolve them.

        {
          test: /\.css$/i,
          use: [MiniCss.loader, 'css-loader']
        },

        // https://github.com/webpack-contrib/file-loader
        // The file-loader resolves import/require() on a file into a url and emits the file into the output directory.
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // https://github.com/johnagan/clean-webpack-plugin
      //  A webpack plugin to remove the build folder(s) current content
      //  before building a new bundle
      new CleanWebpackPlugin(),

      // https://github.com/jantimon/html-webpack-plugin
      // Simplifies creation of HTML files to serve the webpack bundle
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),

      // https://github.com/webpack-contrib/mini-css-extract-plugin
      // This plugin extracts CSS into separate files.
      // It creates a CSS file per JS file which contains CSS.
      // It supports On-Demand-Loading of CSS and SourceMaps.
      new MiniCss({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: true
      }),
      // this inserts envirnoment variables
      new webpack.DefinePlugin(envKeys)
    ],
    //giver webpack-dev-server permission for react to handle URL routing
    devServer: {
      disableHostCheck: true,
      historyApiFallback: true
    }
  };
};
