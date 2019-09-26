const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/681a4e2309bc24e617cefb27dd3e5f00/' + lat + ',' + long + '?units=si'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ` It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} percent chance of rain. Highest temperature today will be ` + body.daily.data[0].temperatureHigh + ' degrees.')
        }
    })
}

module.exports = forecast