const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1Ijoic2lyZXg3NzciLCJhIjoiY203cGJ4eWlsMGQ4MzJpc2RzeHBycGt3MyJ9.RtHmW13MOcMnT25hgLKrRA&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unabble to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined , {
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude,
                location: body.features[0].properties.full_address,
            })
        }
    })
}

module.exports = geocode;
