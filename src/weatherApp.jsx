import React,{useState,useEffect} from 'react'

export default function WeatherApp() {
    const [query,setQuery] = useState('')
    const [weather,setWeather] = useState(null)
    const [warm,setWarm] = useState(false)
    function handleInput(event){
        setQuery(event.target.value)
    }
    async function fetchWeather(){
        const api_key = '7340c495eedcf96abe958fa8dcb25643'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${api_key}`
        const response = await fetch(url)
        const weatherData = await response.json()
        if(weatherData.main){
            setWeather(weatherData)
                if(weatherData.main.temp > 25){
                    setWarm(true)
                }
                else{
                    setWarm(false)
                }
        }
        else{
            setWeather(null)
            setWarm(false)
        }
        
    }

    useEffect(()=>{
        if(query){
            fetchWeather()
        }
    },[query])
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    const d = new Date()
    const day = days[d.getDay()]
    const month = months[d.getMonth()]
    const year = d.getFullYear()

  return (
        <div className={`container ${warm ? 'warm' : ''}`}>        <div className="input-wrapper">
            <input type='text' 
            onChange={handleInput}
            placeholder='enter the city'
            />
        </div>
        {weather && weather.main ? (
            <div className="result">
            <h1 className='city'>{weather.name},{weather.sys.country}</h1>
            <p className='date'>{day} {d.getDay()} {month} {year}</p>
            <h1 className='temp'>{Math.round(weather.main.temp)}°C</h1>
            <h3 className='state'>{weather.weather[0].main}</h3>
        </div>
        ) : 'no data available'}
    </div>
  )
}
