
const Filter = ({setShow, setFilteredNames, persons}) => {

    const handleSearch = (event) => {
        //console.log(show.setShow, 'what')
        let toSearch = event.target.value
        setShow(true)
        if (toSearch.length == 0)
            setShow(false)
        let filtered = persons.filter(person => person.name.toLowerCase().includes(toSearch.toLowerCase()))
        setFilteredNames(filtered)
    }
    return(
        <p>filter shown with<input onChange={handleSearch}></input></p>
    )
}

  export default Filter