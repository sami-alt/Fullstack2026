import { useEffect } from "react"
import { useState } from "react"
import countryServices from '../services/countries'

const Country = ({country}) => {
    const [weather, setWeather] = useState(null)

    if (!country)
        return null
    
    useEffect(()=>{
        countryServices
        .getWeather(country.capital)
        .then(response => setWeather(response))
    },[])
    

    if (!weather)
        return null

    return (
        <>
        <h1>{country.name.official}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>

        <h3>Languages</h3>
        <ul>{Object.values(country.languages).map((lang, i) => <li key={i}>{lang}</li> )}</ul>
        <img src={country.flags.png}></img>
        <h3>Weather in {country.capital}</h3>
        <p>Temperature {(weather.main.temp - 272.15).toFixed(1)} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Wind {weather.wind.speed} m/s</p>
        </>
    )
}

export default Country