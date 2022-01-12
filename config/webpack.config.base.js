const path = require('path')

const utils = require('./utils')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// debugger

const webpackconfig = {
  target: 'node',
  entry: {
    server: path.join(utils.APP_PATH, 'index.js')
  },
  resolve: {
    ...utils.getWebpackResolveConfig()
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [path.join(__dirname, '/node_modules')]
      }
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'process.env.NODE_ENV': JSON.stringify((process.env.NODE_ENV === 'prodection' || process.env.NODE_ENV === 'prod') ? "'production'" : "'development'")
      }
    })
  ],
  node: {
    // console: true,
    global: true,
    // process: true,
    // Buffer: true,
    __filename: true,
    __dirname: true,
    // setImmediate: true,
    // path: true
  }
}

console.log(webpackconfig);

module.exports = webpackconfig
