import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ lat, long }) => {

    const [weatherData, setWeatherData] = useState(null);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;

    const weatherDescriptions = {
        "0": "Clear sky",
        "1": "Mainly clear",
        "2": "Partly cloudy",
        "3": "Overcast",
        "45": "Fog",
        "48": "Depositing rime fog",
        "51": "Drizzle: Light",
        "53": "Drizzle: Moderate",
        "55": "Drizzle: Dense intensity",
        "56": "Freezing Drizzle: Light",
        "57": "Freezing Drizzle: Dense intensity",
        "61": "Rain: Slight",
        "63": "Rain: Moderate",
        "65": "Rain: Heavy intensity",
        "66": "Freezing Rain: Light",
        "67": "Freezing Rain: Heavy intensity",
        "71": "Snow fall: Slight",
        "73": "Snow fall: Moderate",
        "75": "Snow fall: Heavy intensity",
        "77": "Snow grains",
        "80": "Rain showers: Slight",
        "81": "Rain showers: Moderate",
        "82": "Rain showers: Violent",
        "85": "Snow showers slight",
        "86": "Snow showers heavy",
        "95": "Thunderstorm: Slight or moderate",
        "96": "Thunderstorm with slight hail",
        "99": "Thunderstorm with heavy hail"
    };

  useEffect(() => {
      if (weatherData) return;
      
      axios.get(url).then((response) => {
          setWeatherData(response.data);
          console.log(response.data);
      });
  }, [])
    
    if(weatherData) return <div>
        <div>Temperature: {weatherData.current_weather.temperature} Celcius</div>
        <div>Wind speed: {weatherData.current_weather.windspeed}</div>
        <div>Weather type: {weatherDescriptions[weatherData.current_weather.weathercode]}</div>
    </div>
};

export default Weather;