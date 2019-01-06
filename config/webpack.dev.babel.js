import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin  from 'clean-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'

export default {
  mode: 'development',
  entry: {
    main: [
      'webpack-hot-middleware/client?reload=true',
      './src/client/index.js'
    ]
  },
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      }, {
        test: /.html$/,
        use: [
          {loader : 'html-loader'}
        ]
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: './src/client/index.html',
      title: 'திருக்குறள்'
    }),
    new CleanWebpackPlugin('lib', {
      root : path.resolve(__dirname, "lib"),
      verbose : true
    })
  ],
  devtool: 'source-map',
  devServer : {
    contentBase: 'lib',
    overlay: true,
    hot: true,
    stats:{
      colors : true
    }
  }
}