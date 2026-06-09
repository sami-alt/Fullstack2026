const Contacts = ({persons}) => {
  return (
    persons.map((person, i) => <li key={i}>{person.name} {person.number}</li>)
  )
}

export default Contacts