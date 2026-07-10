const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


morgan.token('body', req => {
  return JSON.stringify(req.body)
})
morgan.token('content_length', req => {
    return JSON.stringify(req.res._contentLength)
})
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :content_length - :total-time[3] ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(person => person.id === req.params.id)
    if (person)
        res.json(person)
    else
        res.status(404).end()
})

app.get('/info', (req, res) => {
    const count = persons.reduce( (acc, next) => acc + 1, 0)
    res.send(`<p>Phonebook has info for ${count} people</p> ${new Date()}`)
})


app.post('/api/persons', (req, res) => {
    const person = {"id": String(Math.floor(Math.random()*10000)),"name":req.body.name, "number":req.body.number}
    if ((person.name.length === 0 || person.number.length === 0) || !person.name || !person.number)
        return res.status(400).json({error:'name or number missing!'})

    const exists = persons.find(exists => exists.name === person.name)
    if (exists)
        return res.status(409).json({error:'name must be unique'})

    persons = persons.concat(person)
    res.status(201).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const is = persons.find(person => person.id === id)
    if (!is){
        console.log("error")
        return res.status(404).json({error:'name already removed from database'})
    }
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log(`Server runnin on port ${PORT}`)
})