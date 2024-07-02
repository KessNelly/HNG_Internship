const axios = require('axios');
require("dotenv").config();
const fetchTemperature = require('../utils/weather');
const baseUrl =`http://api.weatherapi.com/v1/current.json?key=${process.env.ipAddressAPI}`

const getResponse = async (req, res) => {
    const visitorName = req.query.visitor_name;

    try {
     let clientIp = process.env.NODE_ENV!="production" ? req.ip : req.headers["x-forwarded-for"]; 
      // let clientIp = req.headers["x-forwarded-for"]; 

      // get location using a geolocation API
       const result = await axios.get(`${baseUrl}&q=${clientIp}`);
     
      // Check if ipAddress indicates an error
       if (result.data.error) {
        throw new Error(result.data.reason);
         }
       
       const location = result.data.location.name;

        //get temperature from a weather API
        const temperature = result.data.current.temp_c;

        const greeting = `Hello, ${visitorName || "visitor"}!, the temperature is ${temperature} degrees Celsius in ${location}`;

        const data = {
                    client_ip: clientIp,
                    location: location,
                    greeting: greeting
                };
        
            
                res.json(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

module.exports = getResponse;
