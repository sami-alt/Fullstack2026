import { useEffect, useState } from 'react'
import axios from 'axios'
import contactServices from './services/contacts.js'
import Contacts from './components/contacts'
import Filter from './components/filter'
import PersonForm from './components/addPerson'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState([])
  const [show, setShow] = useState(false)
  
  useEffect(()=> {
    contactServices
      .getAll()
      .then(response => setPersons(response))
  },[])
  

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter setShow={setShow} setFilteredNames={setFilteredNames} persons={persons}></Filter>
      <h3>add new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons}></PersonForm>
      <h3>Numbers</h3>
        <Contacts persons={show ? filteredNames : persons} setPersons={setPersons}></Contacts>
    </div>
  )
}

export default App