import path from 'path';
import CleanWebpackPlugin  from 'clean-webpack-plugin'
import HtmlWebPackPlugin from "html-webpack-plugin";

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template : "./src/client/index.html",
  path: __dirname + '/app',
  fileName : "index.html"
})
const pathsToClean = ["app"]
const cleanOptions = {
  root : path.resolve(__dirname, "lib"),
  verbose : true
}
const cleanWebpackPlugin =  new CleanWebpackPlugin(pathsToClean, cleanOptions)

module.exports = {
  entry : "./src/client/app.js",
  output : {
    path: path.resolve(__dirname, './lib/app/'),
    filename: 'index_[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    cleanWebpackPlugin
  ]
}