const request = require('request')


const geocode = (address,callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=f35ba34e69f1d919ec571878583c1e67&query='+address+'&limit=1'

    request({url, json : true}, (error,{body}) =>{
        if(error){
            callback('Unable to connect to local services!',undefined)
            //earlier body.data[0] === undefined
        }else if(body.error || body.data.length === 0){
            callback('Location not found please try it again.',undefined)
        }else{
            callback(undefined,{
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })

}

module.exports = geocode