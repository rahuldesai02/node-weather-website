const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup hbs views
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Rahul'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error:"Please Provide Address"
        })
    }

    geocode(address,(error,{latitude,longitude,location}={})=>{

        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude,longitude,(error,ForecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }

            return res.send({
                forecast:ForecastData,
                location,
                address
            })
        })

    })

    

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Rahul'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Rahul"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404",
        message:"Help article not found",
        name:"Rahul"

    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        message:"Page Not found",
        name:"Rahul"

    })
})

app.listen(port,()=>{
    console.log('Server is Running on Port '+port)
}) 