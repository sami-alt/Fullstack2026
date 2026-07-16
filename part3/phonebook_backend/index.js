const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Contact = require('./modules/contact')



morgan.token('body', req => {
  return JSON.stringify(req.body)
})
morgan.token('content_length', req => {
  return JSON.stringify(req.res._contentLength)
})

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
app.use(morgan(':method :url :status :content_length - :total-time[3] ms :body'))


const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === 'CastError'){
    return res.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError')
    return res.status(400).json({ error:error.message })
  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (req, res, next) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findById(id)
    .then(result => {
      if (result)
        res.json(result)
      else
        res.status(404).end()
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Contact.find({})
    .then(result => {
      res.send(`<p>Phonebook has info for ${result.length} people</p> ${new Date()}`)
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const id = req.params.id

  Contact.findById(id)
    .then(contact => {
      if (!contact)
        return res.status(404).end()
      contact.name = name
      contact.number = number

      return contact.save().then(update => {
        res.json(update)
      })
    })
    .catch(error => next(error))

})

app.post('/api/persons', (req, res, next) => {
  const  contact = new Contact({ 'name':req.body.name, 'number':req.body.number })

  contact.save()
    .then(
      () => { res.status(201).json(contact) })
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findByIdAndDelete(id)
    .then(result => {
      if (!result)
        return res.status(404).json({ error:'name already removed from database' })
      else
        res.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT


app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`)
})