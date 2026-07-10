
const Filter = ({setShow, setFilteredNames, persons}) => {

    const handleSearch = (event) => {
        let toSearch = event.target.value
        setShow(true)
        if (toSearch.length == 0)
            setShow(false)
        let filtered = persons.filter(person => person.name.toLowerCase().includes(toSearch.toLowerCase()))
        if (persons.filter(person => person.name.toLowerCase() === toSearch.toLowerCase()).length === 1){
            //console.log(persons.filter(person => person.name.toLowerCase() === toSearch.toLowerCase()))
            filtered = persons.filter(person => person.name.toLowerCase() === toSearch.toLowerCase())
            //console.log("aaa")
            setFilteredNames(filtered)
            return
        }
        setFilteredNames(filtered)
    }
    return(
        <p>filter shown with<input onChange={handleSearch}></input></p>
    )
}

  export default Filter