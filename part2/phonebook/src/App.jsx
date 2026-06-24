import { useState } from 'react'
import Contacts from './components/contacts'
import Filter from './components/filter'
import PersonForm from './components/addPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState([])
  const [show, setShow] = useState(false)
  //const [nameToSearch, setNameToSearch] = useState(false)


 
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter setShow={setShow} setFilteredNames={setFilteredNames} persons={persons}></Filter>
      <h3>add new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons}></PersonForm>
      <h3>Numbers</h3>
        <Contacts persons={show ? filteredNames : persons}></Contacts>
    </div>
  )
}

export default App