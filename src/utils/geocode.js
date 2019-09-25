const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3VubmhpbG0iLCJhIjoiY2swdG5wNjJpMGZmMjNkbGFtOHBnYms1ciJ9.FbD3kK_UWmM2e_5qphcUMw'  

    request({ url, json: true }, (error, { body }) => {
        if (error) { // pass the error (or error message?) to the callback, so we can do what we want with it in each case (console.log, email, logfile etc)
            callback('Unable to connect to location services', undefined) // undefined means no data is being returned
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode