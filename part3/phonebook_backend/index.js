const express = require('express')
const app = express()



const testData = [
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
    console.log("bloo")
    res.json(testData)
})

app.get('/info', (req, res) => {
    const count = testData.reduce( (acc, next) => acc + 1, 0)
    const msg = `<p>Phonebook has info for ${count} people</p> ${new Date()}`
    res.send(msg)
})

const PORT = 3001

app.listen(PORT, ()=> {
    console.log(`Server runnin on port ${PORT}`)
})