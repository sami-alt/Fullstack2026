import Country from "./displayCountry"


const Countries = ({countries, filtered}) => {

    if (!countries)
        return null

    if (filtered.length > 0){
        if (filtered.length > 10){
            return "Too many matches, specify another filter"
        }
        if (filtered.length === 1){
            return (<Country country={filtered[0]}></Country>)
        }
        return (filtered.map((country,i) => <li key={i}>{country.name.common}</li>))
    }
    return (countries.map((country,i) => <li key={i}>{country.name.common}</li>))
}

export default Countries