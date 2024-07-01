const axios = require('axios');

const weatherApiKey = process.env.weatherApiKey;
const weatherUrl = process.env.weatherUrl;

const fetchWeather = async (req, res) =>{
    try {
        const response = await axios.get(weatherUrl);
        const weatherData = response.data;
        console.log(`Current temperature is ${weatherData.main.temp}°C`);
        // console.log(`Current temperature in ${city}: ${weatherData.main.temp}°C`);
        // console.log(`Weather description: ${weatherData.weather[0].description}`);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
}

module.exports =  fetchWeather;
