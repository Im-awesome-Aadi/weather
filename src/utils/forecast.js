const request = require('request')

const forecast =(lat,lon,callback)=>{
    const url='https://api.darksky.net/forecast/b26153493c3299d7d47f97c66bf6e6f2/'+lat+','+lon+'?units=si'

request({url: url , json:true},(error,response)=>{
    if(error)
        callback('Not able to connect. Please Check your Internet Connection', undefined)
    else if(response.body.error)
        callback('No location found. Try another Search',undefined)
    else{
    callback(undefined,{
        summary :response.body.daily.data[0].summary,
        temp : response.body.currently.temperature,

    })
    }
})

}
module.exports = forecast
