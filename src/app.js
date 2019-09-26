const path = require('path')
const express = require('express') // express is a function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // to get handlebars set up
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { //request and response are to objects that are callbackfunctions for a route that get passed
    res.render('index', {   // this second argument, an object, is available to us in the hbs-page. in double curly brackets
        title: 'Weather',
        name: 'Gunnhild Marthinsen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gunnhild Marthinsen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is an example help message',
        name: 'Gunnhild Marthinsen'
    })
})


// route-pagee
/* app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})
 */

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
            
        })
                
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {    // search is mandatory (key in querystring)
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({products: [] 
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
       title: '404',
       errorMessage: 'Help article not  found',
       name: 'Gunnhild Marthinsen'
    })
})

app.get('*', (req, res) => { // *:  match anything that haven't been matched so far
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Gunnhild Marthinsen'
    })
})

// start the server up:
app.listen(port, () => {  // port 3000. not default.
    console.log('Server is up on port ' + port)
})
