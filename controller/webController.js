const axios = require('axios');
const fetchTemperature = require('../utils/weather');

const getResponse = async (req, res) => {
    const visitorName = req.query.visitor_name;

    try {
        //const clientIp = req.ip;
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('Client IP:', clientIp);

        // Fetch location using ipinfo.io API
        //const ipinfoUrl = `https://ipinfo.io/${clientIp}/json`;
        const ipinfoUrl = `https://ipinfo.io/${clientIp}/json?token=${process.env.TOKEN}`;
        console.log('ipinfoUrl:', ipinfoUrl);


        const ipinfoResponse = await axios.get(ipinfoUrl);
        console.log('ipinfoResponse:', ipinfoResponse.data);

        if (!ipinfoResponse.data.city) {
            throw new Error('Failed to fetch location');
        
        }
        
        const location = ipinfoResponse.data.city;
        console.log('Location:', location);

        // Get temperature from a weather API
        const temperature = await fetchTemperature(location);

        const greeting = `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`;

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