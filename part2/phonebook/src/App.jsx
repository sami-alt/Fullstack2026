import { use, useEffect, useState } from 'react'
import axios from 'axios'
import contactServices from './services/contacts.js'
import Contacts from './components/contacts'
import Filter from './components/filter'
import PersonForm from './components/addPerson'
import Message from './components/message.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredNames, setFilteredNames] = useState([])
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(()=> {
    contactServices
      .getAll()
      .then(response => setPersons(response))
  },[])
  

  return (
    <div>
      <h2>Phonebook</h2>
        <Message message={message} setMessage={setMessage}></Message>
        <Filter setShow={setShow} setFilteredNames={setFilteredNames} persons={persons}></Filter>
      <h3>add new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setMessage={setMessage}></PersonForm>
      <h3>Numbers</h3>
        <Contacts persons={show ? filteredNames : persons} setPersons={setPersons} setMessage={setMessage}></Contacts>
    </div>
  )
}

export default App