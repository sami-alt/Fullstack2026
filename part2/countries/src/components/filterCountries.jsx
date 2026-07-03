

const Filter = ({countries, filter, setFiltered, setShow}) => {

    const handleSearch = (event) => {
        setShow(null)
      const search = event.target.value
      const match = countries.filter((countryName) => countryName.name.official.toLowerCase().includes(search.toLowerCase())).map((country => country))
      setFiltered(match)
      if (search.length === 0)
          setFiltered([])
    }


    return (
        <input onChange={handleSearch}></input>
    )
}

export default Filter