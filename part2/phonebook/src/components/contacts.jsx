import contactServices from "../services/contacts"

const Contacts = ({persons, setPersons}) => {

  const removeContact = ({name, number, id}) => {
    if(window.confirm(`Delete ${name}`)){
      contactServices
        .removeContact(id)
        .then(response => response)
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
    }
  }

  return (
    persons.map((person) => <li key={person.id}>{person.name} {person.number} <button onClick={()=> removeContact(person)}>delete</button> </li>)
  )
}

export default Contacts