console.log("Node connected!")

// DEPENDENCIES
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const methodOverride = require('method-override')
const mongoose = require('mongoose')


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
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended:true }))

// API CALLOUT example
// axios({
//     method: 'get',
//     headers: { Authorization: `Bearer ${token}` },
//     url: 'https://api.petfinder.com/v2/animals?type=dog',
// })
// .then(response => {
//     console.log(response.data.animals[1])
//     console.log(response.data.animals[1].contact)
// })
// .catch((error) => {
//     console.log('ERROR >>> ', error)
// })