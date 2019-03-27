const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/2c8009cf7e196ac7895d6ce8fdcc6f5e/' + latitude + ',' + longitude + '?units=si'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('',undefined)
        }
        else if(body.error){
            callback('',undefined)
        }
        else{
            callback(undefined, ` ${body.currently.summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast