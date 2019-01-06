import express from 'express'
import bodyParser from 'body-parser'
import apis from './routes/api'
import mongoose from 'mongoose'
import path from 'path'
import config from '../../config/webpack.dev.babel'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

require('dotenv').config()

const app = express()

const { DB_NAME, MONGO_URL, NODE_ENV } = process.env

const isProd = (NODE_ENV === "production")
const PORT = 3000
if(!isProd){
  const compiler = webpack(config)
  const devMiddleware = webpackDevMiddleware(compiler, config.devServer)
  const hotMiddleware = webpackHotMiddleware(compiler, config.devServer)
  app.use(devMiddleware)
  app.use(hotMiddleware)
}

const staticMiddleware = express.static(path.resolve(__dirname, '../../lib'))
app.use(staticMiddleware)

app.disable('x-powered-by')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// if (isProd) {
//   const path = require('path')
//   const staticPath = path.resolve(__dirname, "../app")
//   app.use(express.static(staticPath))
// }

app.use('/api/v1', apis)

mongoose.connect(`${MONGO_URL}/${DB_NAME}`, { useNewUrlParser: true })
  .then(() => {
    console.log("Sucessfully connected to DB")
    app.listen(PORT, () => console.log(`App is listenting on ${PORT}`))
  })
  .catch(err => console.log("Error connecting DB", err))