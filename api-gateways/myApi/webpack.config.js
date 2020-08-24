const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  entry: './src/handler.ts',
  mode: "production",
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  externals: [{
    'aws-sdk': 'commonjs aws-sdk'
  }],
  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ZipPlugin({
      filename: `myservice.zip`
    })
  ],
  output: {
    filename: 'myservice.js',
    path: path.resolve(__dirname, 'resources'),
    libraryTarget: 'commonjs2'
  }
};
