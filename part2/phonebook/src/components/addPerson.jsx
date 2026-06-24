
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
    setPersons(persons.concat({name:newName, number:newNumber}))
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