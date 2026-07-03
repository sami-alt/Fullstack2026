
const Country = ({country}) => {

    if (!country)
        return null
    
    console.log("from Country component",country)

    return (
        <>
        <h1>{country.name.official}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>

        <h3>Languages</h3>
        <ul>{Object.values(country.languages).map((lang, i) => <li key={i}>{lang}</li> )}</ul>
        <img src={country.flags.png}></img>
        </>
    )
}

export default Country