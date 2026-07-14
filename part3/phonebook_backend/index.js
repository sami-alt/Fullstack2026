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
        return response.status(400).send({error: 'malformed id'})
    }
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

/*
app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const person = Contact.findById(id)
    if (person)
    res.json(person)
    else
        res.status(404).end()
})

app.get('/info', (req, res) => {
    const count = persons.reduce( (acc, next) => acc + 1, 0)
    res.send(`<p>Phonebook has info for ${count} people</p> ${new Date()}`)
})
*/


app.post('/api/persons', (req, res, next) => {
    const  contact = new Contact({"name":req.body.name, "number":req.body.number})
    if ((contact.name.length === 0 || contact.number.length === 0) || !contact.name || !contact.number)
        return res.status(400).json({error:'name or number missing!'})

    contact.save()
    .then(
        result => {res.status(201).json(contact)
    })
    .catch(error => next(error))
    
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Contact.findByIdAndDelete(id)
    .then(result => {
        if (!result)
            return res.status(404).json({error:'name already removed from database'})
        else
            res.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT


app.listen(PORT, ()=> {
    console.log(`Server runnin on port ${PORT}`)
})