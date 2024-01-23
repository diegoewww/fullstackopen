// Configuración
const config = require('./utils/config')
const logger = require('./utils/logger')

// Express y middleware
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')

// Rutas
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


// Base de datos (por ejemplo, Mongoose)
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)
app.use('/api/blogs',middleware.tokenExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app