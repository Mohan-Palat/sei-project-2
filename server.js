console.log("Node connected!")

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
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

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

// CONTROLLERS
const userController = require('./controllers/usersController')
app.use('/users', userController)
const dogController = require('./controllers/dogsControllers')
app.use('/dogs', dogController)


//API CALLOUT example
// axios({
//     method: 'get',
//     headers: { Authorization: `Bearer ${token}` },
//     url: 'https://api.petfinder.com/v2/types/dog/breeds',
// })
// .then(response => {
//     console.log(response.data.breeds[1])
// })
// .catch((error) => {
//     console.log('ERROR >>> ', error)
// })

app.listen(PORT, () => {
    console.log("Hey! I'm listening for requests...")
})