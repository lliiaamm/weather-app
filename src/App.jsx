import { useState } from 'react';
import './App.css';
import {WEATHER_API_KEY} from './configs/apiKeys'


function App() {
  
  // States
  const [weatherData, setWeatherData] = useState(null)
  const [errMsg, setErrMsg] = useState(null)

  // Handlers
  const submitHandler = async e => {
    e.preventDefault()
    const [{value: city}, {value: state}] = e.target
    
    // Fetch actual coorinates
    const res_coords = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state}&appid=${WEATHER_API_KEY}`
    )
    const coords = await res_coords.json()
    
    // Check given coordinates
    if (!coords?.length) {
      return setErrMsg('Location details are wrong, try again')
    }
    else {
      setErrMsg(null)
    }
    
    // Fetch weather data for coordinates
    const res_weather = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coords[0].lat}&lon=${coords[0].lon}&appid=${WEATHER_API_KEY}`
    )
    const weather = await res_weather.json()
    setWeatherData(weather)
  }

  return (
    <main className="App">
      
      <header>
        <h1>Welcome to the Weather API!</h1>
      </header>

      {/* location form */}
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='City' /><br />
        <input type="text" placeholder='State' /><br />
        <input type="submit" value="Submit" />
      </form>

      {/* error message section */}
      {errMsg && (
        <p className='err-msg'>{errMsg}</p>
      )}

      {/* weather data section */}
      {weatherData && (
        <div className="weather-data">
          <h2>Weather data for {weatherData.city.name}:</h2>
          <p>Weather Date: {weatherData.list[0].dt_txt}</p>
          <p>Temp: {weatherData.list[0].main.temp} °C</p>
          <p>Humidity: {weatherData.list[0].main.humidity}</p>
          <p>Wind Speed: {weatherData.list[0].wind.speed} km/h</p>
        </div>
      )}

    </main>
  );
}

export default App;


// api.openweathermap.org/data/2.5/forecast?id=524901&appid=157c86c50d40a080121596df442e8739