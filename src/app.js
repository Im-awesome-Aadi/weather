const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public') //GENERAL STATIC CONFIG
const viewPath = path.join(__dirname, '../templates/views') 
const partialpath = path.join(__dirname, '../templates/partials')


app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialpath)
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('inde.hbs',{
        title : 'Weather App',
        name : 'jiji'
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title : 'About Developer',
        name : 'jiji'
    })
})

app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        title : 'Help',
        name : 'jiji'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Enter The Address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(data.latitude, data.longitude, (error,forecastdata)=>{
            if(error){
                return res.send(
                    {error})
            }
            
            res.send({

        address : req.query.address,
        place : data.place,
        forecast : forecastdata.summary,
        temperature : forecastdata.temp
    })
            //console.log(data.place)
            //console.log(forecastdata)
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404.hbs',{
        errorMessage : 'Help page not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404.hbs',{
        errorMessage : 'Page not found'
    })
})
app.listen(3000, ()=>{
    console.log('Server on port 3000')
})