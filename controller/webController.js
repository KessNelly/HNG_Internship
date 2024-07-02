const axios = require('axios');
require("dotenv").config();
const fetchTemperature = require('../utils/weather');
const baseUrl =`http://api.weatherapi.com/v1/current.json?key=${process.env.ipAddressAPI}`

const getResponse = async (req, res) => {
    const visitorName = req.query.visitor_name;

    try {
       let clientIp = process.env.NODE_ENV!="production" ? req.ip : req.headers["x-forwarded-for"]; 

      // get location using a geolocation API
       const result = await axios.get(`${baseUrl}&q=${clientIp}`);
     
      // Check if ipAddress indicates an error
       if (result.data.error) {
        throw new Error(result.data.reason);
         }
       
       const location = result.data.location.name;

       console.log(result.data);
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
























// const axios = require('axios');
// const fetchTemperature = require('../utils/weather');


// const getResponse = async (req, res) => {
//     const visitorName = req.query.visitor_name;

//     try {
//         const clientIp = req.ip;

//         // get location using a geolocation API
//        const ipAddress = await axios.get(`https://ipapi.co/${clientIp}/json/`);
//       // const ipAddress = await axios.get(`https://ipapi.co/json/`);


//        // Check if ipAddress indicates an error
//     //    if (ipAddress.data.error) {
//     //     throw new Error(ipAddress.data.reason);
//     //      }
       
//        const location = ipAddress.data.city;

//        console.log(ipAddress.data);
//         //get temperatue from a weather API
//         //const temperature = 11;
//         const temperature = await fetchTemperature(location);

//         const greeting = `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`;

//         const data = {
//                     client_ip: clientIp,
//                     location: location,
//                     greeting: greeting
//                 };
            
//                 res.json(data);

//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// };

// module.exports = getResponse;