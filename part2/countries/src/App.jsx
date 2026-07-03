import { useState } from 'react'
import { useEffect } from 'react'
import countryServices from "./services/countries"

import Countries from './components/displayCountries'
import Filter from './components/filterCountries'

function App() {
  const [countries, setCountries] = useState(null)  
  const [filtered, setFiltered] = useState([])
  //const [show, setShow] = useState(false)

  useEffect(()=>{
    countryServices
    .getCountries()
    .then(response => setCountries(response))
    .catch(error => console.log(error))
    
  },[])

  return (
    <>
    <h1>App</h1>
    <Filter countries={countries} filtered={filtered} setFiltered={setFiltered}></Filter>
    <Countries countries={countries} filtered={filtered}></Countries>
    </>
  )
}

export default App
