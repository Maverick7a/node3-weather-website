const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=cd592059a29e43ab61e7e155e401ae38&query='+latitude+ ',' + longitude+'&units=m'

    request({url, json: true}, (error, {body}) => {
        
        if(error) {
            callback('Please check your connection', undefined)
        } else if (body.error) {
            callback('Please write the correct coordinates', undefined);
        } else {
            callback(undefined, { temperature: body.current.temperature, 
                weather_descriptions: body.current.weather_descriptions, 
                location: body.location.name
            });
        }
    })
}

// forecast(49.841952, 24.031592, (error, data) => {
//     console.log("Error", error);
//     console.log('Data', data);
// })

module.exports = forecast;