const request = require('request')


const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1IjoiYWFkaS1tcDMiLCJhIjoiY2s1cXRxZXM2MDVrdjNtcGJ0aTlpNG1yMCJ9.WJ0R9lVwM9MlgNTyuL0f4A'
    request({url:url, json:true},(error,response)=>{
        if(error){
            callback('Unable to connect. Check your Internet Connection.',undefined)
        }else if(response.body.features.length===0){
            callback('No such location found. Try another Search',undefined)
        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                place : response.body.features[0].place_name
            })
        }

    })

}
module.exports = geocode