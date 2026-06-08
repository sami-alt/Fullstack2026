import { useState } from 'react'
import Contacts from './components/contacts'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleAddName = (event) => {
    setNewName(event.target.value)

  }
  
  const addName = () => {
    event.preventDefault()
    setPersons(persons.concat({name:newName}))
    setNewName("")
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleAddName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Contacts persons={persons}></Contacts>
    </div>
  )
}

export default App