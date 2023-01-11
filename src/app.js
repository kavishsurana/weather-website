const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewPath = path.join(__dirname,'../tempelates/views')
const partialPath = path.join(__dirname, '../tempelates/partials')

//setup static directatory to server
app.use(express.static(publicDirectoryPath))

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialPath)

app.get('', (req,res) => {
    res.render('index', {
        title:'WEATHER',
        name: 'Kavish'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'ABOUT',
        name : 'Kavish'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'HELP',
        helpText : "Can't find Weather plz.. enter correct location",
        name : 'Kavish'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'No address is provided'
        })
    }

    geocode(req.query.address, (error , {latitude, longitude, location} ={}) => {
        if(error){
            return res.send({error })
        }

        forecast(latitude , longitude , (error , forecastdata) => {
            if(error){
                return res.send({error})
            }
        

        res.send({
            forecast : forecastdata,
            location,
            address : req.query.address
        })
    })

})


    // res.send({
    //     forecast : 'It is snowing',
    //     location : 'Manali',
    //     address : req.query.address
    // })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        name : 'Kavish',
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404' , {
        title : '404',
        name : 'Kavish',
        errorMessage : 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running')
})
