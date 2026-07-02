import axios from "axios"
import contactServices from "../services/contacts"

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, setMessage}) => {

    const handleAddName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = () => {
    event.preventDefault()
    
    if (persons.map(person => person.name).includes(newName)){
      if (window.confirm(`${newName} is alredy added to phonebook, replace old number with new one?`))
      { 
        const contactToChange = persons.filter(person => person.name === newName)[0]
        const newContact = {...contactToChange, number:newNumber}
        contactServices
          .updateContactNumber(contactToChange.id, newContact)
          .then(response =>{
            setPersons(persons.map(person => person.id === contactToChange.id ? response[0] : person ))
            })

        setNewName('')
        setNewNumber('')  
        return
      }
    }
    
    const latest_id = persons.length === 0 ? 0 : persons.reduce((curr, next) => (curr.id < next.id ? next : curr)).id
    const newContact = {name:newName, number:newNumber, id:String(Number(latest_id) + 1)}

    contactServices
      .addContact(newContact)
      .then(response => setPersons(persons.concat(response)))

    setMessage({msg:`${newName} succesfully added to phonebook`, status:"success"})
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