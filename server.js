console.log("Node connected!")

// DEPENDENCIES
require('dotenv').config()
const axios = require('axios')


// CONFIGURATION
const token = process.env.TOKEN

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