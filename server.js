// DEPENDENCIES
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')


// CONFIGURATION
const app = express()
const token = process.env.TOKEN
const db = mongoose.connection
// configured like this, for deployment
const PORT = process.env.PORT || 3000
const mongodbURI = process.env.MONGODBURI || 'mongodb://localhost:27017/'+ 'adopt_a_dog';

// DATABASE
mongoose.connect(
    mongodbURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => {
      console.log('the connection with mongod is established at', mongodbURI)
    }
  )

// Connection Error/Success
// Define callback functions for various events
db.on('error', err => console.log(err.message + ' is mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended:true }))
app.use(express.static('public'))

// MAIN ROUTE 
// - when entering application on https://<hostname>/ I should be lead directly to the login page
app.get('/', (req, res) => {
    res.render('users/login')
})

// CONTROLLERS
const userController = require('./controllers/usersController')
app.use('/users', userController)
const dogController = require('./controllers/dogsControllers')
app.use('/dogs', dogController)

// APP LISTEN ON PORT
app.listen(PORT, () => {
    console.log("Hey! I'm listening for requests...")
})