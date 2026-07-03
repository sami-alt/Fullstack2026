import Country from "./displayCountry"


const Countries = ({countries, filtered, show, setShow}) => {

    if (!countries)
        return null

    if (show)
        return(<Country country={show}></Country>)

    if (filtered.length > 0){
        if (filtered.length > 10){
            return "Too many matches, specify another filter"
        }
        if (filtered.length === 1){
            return (<Country country={filtered[0]}></Country>)
        }
        return (filtered.map((country,i) => <li key={i}>{country.name.common}<button onClick={()=>setShow(country)}>show</button></li>))
    }

}

export default Countries