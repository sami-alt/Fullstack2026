import { useState } from 'react'
import Contacts from './components/contacts'
import { use } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewnumber] = useState('')
  const [nameToSearch, setNameToSearch] = useState(false)
  const [filteredNames, setFilteredNames] = useState([])
  const [show, setShow] = useState(false)

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumber = (event) => {
    setNewnumber(event.target.value)
  }

  const addContact = () => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)){
      alert(`${newName} is alredy added to phonebook`)
      return
    }
    setPersons(persons.concat({name:newName, number:newNumber}))
    setNewName('')
    setNewnumber('')
  }
  
  const handleSearch = (event) => {
    let toSearch = event.target.value
    setNameToSearch(toSearch)
    setShow(true)
    if (toSearch.length == 0)
        setShow(false)
    let filtered = persons.filter(person => person.name.toLowerCase().includes(toSearch.toLowerCase()))
    setFilteredNames(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <p>filter shown with<input onChange={handleSearch}></input></p>
      <h2>add new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleAddName}/>
          <br/>
          number: <input value={newNumber} onChange={handleNumber}/>
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Contacts persons={show ? filteredNames : persons}></Contacts>
    </div>
  )
}

export default App