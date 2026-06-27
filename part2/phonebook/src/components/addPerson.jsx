import axios from "axios"
import contactServices from "../services/contacts"

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {

    const handleAddName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = () => {
    event.preventDefault()
    
    if (persons.map(person => person.name).includes(newName)){
      alert(`${newName} is alredy added to phonebook`)
      return
    }
    
    const latest_id = persons.length === 0 ? 0 : persons.reduce((curr, next) => (curr.id < next.id ? next : curr)).id
    const newContact = {name:newName, number:newNumber, id:String(Number(latest_id) + 1)}

    contactServices
      .addContact(newContact)
      .then(response => setPersons(persons.concat(response)))
    
    setNewName('')
    setNewNumber('')
  }

    return(
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
    )
}

export default PersonForm