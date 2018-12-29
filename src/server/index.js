import express from 'express'
import bodyParser from 'body-parser'
import apis from './routes/api'
import mongoose from 'mongoose'
require('dotenv').config()

const app = express()

const { DB_NAME, MONGO_URL, NODE_ENV } = process.env

const isProd = (NODE_ENV === "production")
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (isProd) {
  const path = require('path')
  const staticPath = path.resolve(__dirname, "../app")
  app.use(express.static(staticPath))
}

app.use('/api/v1', apis)

mongoose.connect(`${MONGO_URL}/${DB_NAME}`)
  .then(() => {
    console.log("Sucessfully connected to DB")
    app.listen(PORT, () => console.log(`App is listenting on ${PORT}`))
  })
  .catch(err => console.log("Error connecting DB", err))