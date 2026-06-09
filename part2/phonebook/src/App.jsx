import { useState } from 'react'
import Contacts from './components/contacts'
import { use } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewnumber] = useState('')

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
    setNewName("")
    setNewnumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleAddName}/>
          number: <input value={newNumber} onChange={handleNumber}/>
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