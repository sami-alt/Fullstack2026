const Contacts = ({persons}) => {
  return (
    persons.map((person, i) => <li key={i}>{person.name}</li>)
  )
}

export default Contacts