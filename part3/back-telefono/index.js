require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons',(req,res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/info', (req, res, next) => {
  const info = {}

  Person.find({})
    .then(result => {
      info.date = new Date()
      info.info = result.length

      const htmlResponse = `
        <h1>Phone book has info for ${info.info} </h1>
        <p>${info.date}</p>
      `

      req.token = 10 + 10
      res.send(htmlResponse)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id',(req,res,next) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person)
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req,res,next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res,next) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id',(req,res,next) => {
  const body = req.body
  const person = {
    name:body.name,
    number:body.number
  }

  Person.findByIdAndUpdate(req.params.id, person ,{ new:true, runValidators:true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => {
      next(error)
    })
})


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
