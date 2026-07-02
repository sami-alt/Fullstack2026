import contactServices from "../services/contacts"

const Contacts = ({persons, setPersons, setMessage}) => {

  const removeContact = ({name, number, id}) => {
    if(window.confirm(`Delete ${name}`)){
      contactServices
        .removeContact(id)
        .then(response => {response, setMessage({msg:`${name} removed from phonebook`, status:"success"})})
        .catch(error => {
          setMessage({msg:`Information of ${name} has already been removed from server`, status:"error"})
        })
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
    }
  }

  return (
    persons.map((person) => <li key={person.id}>{person.name} {person.number} <button onClick={()=> removeContact(person)}>delete</button> </li>)
  )
}

export default Contacts