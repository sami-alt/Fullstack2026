const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

const mongoUrl = process.env.MONGO_DB_URI

mongoose.connect(mongoUrl, { family: 4 })
    .then(() => logger.info("Connected to MongoDB"))
    .catch(error => logger.error(error))

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
 


module.exports = app