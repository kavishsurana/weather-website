const request = require('request')

const forecast = (latitude , longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=63dbfad934633f9ee6b55990587d0cd5&query='+latitude + ',' + longitude + '&units=m'

    request({ url , json : true} , (error, {body}) => {
        if(error){
            callback('Unable to connect to the local service!',undefined)
        }else if(body.error){
            
            callback('Location not found . Please try again',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degress out"
            )
        }
    })
}

module.exports = forecast