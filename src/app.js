const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3002;

//Define path for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Danylo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Danik'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {message: 'I need a help with my node project',
        title:'Danik',
        name: 'Todo'})
})

// Setup static directory to serve
app.use(express.static(publicDirectory));

// app.get('/about', (req,res) => {
//     res.sendFile(aboutPage);
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide the address and forecast"
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            res.send({
                location: location,
                forecastData: forecastData
            })
        })
    })   
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {errorMessage: 'Help article not found'})
})

app.get('*', (req, res) => {
    res.render('404', {errorMessage: 'Page not found'})
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});