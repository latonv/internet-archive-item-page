const path = require('path');

const SRC_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './dist');

module.exports = {
  entry: `${SRC_DIR}/index.ts`,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  devServer: {
    static: {
      directory: BUILD_DIR,
    },
    compress: true,
    port: 8080,
  },
};