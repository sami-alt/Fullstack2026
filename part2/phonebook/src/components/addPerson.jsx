import axios from "axios"

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {

    const handleAddName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = () => {
    event.preventDefault()
    const latest_id = persons.reduce((curr, next) => curr.id < next.id ? next : curr).id
    console.log(latest_id, "id")
    const newContact = {name:newName, number:newNumber, id:latest_id + 1}
    if (persons.map(person => person.name).includes(newName)){
      alert(`${newName} is alredy added to phonebook`)
      return
    }
    axios
      .post("http://localhost:3001/persons", newContact)
      .then(response => console.log(response))
    setPersons(persons.concat(newContact))
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