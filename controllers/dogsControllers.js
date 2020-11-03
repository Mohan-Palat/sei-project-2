// DEPENDENCIES
const router = require('express').Router()
const { Router } = require('express')
const Dog = require('../models/dog')
const User = require('../models/user')
const axios = require('axios')

// CONFIGURATION
const token = process.env.TOKEN

// INDEX ROUTE - SHOW ALL DOGS
router.get('/:userId', (req, res) => {
    User.findById(req.params.userId, (error, foundUser) => {
        let zipCode = parseInt(foundUser.zipCode)
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: `https://api.petfinder.com/v2/animals?type=dog&location=${zipCode}`,
        })
        .then(response => {
            console.log(response.data.animals[1])
            // console.log(response.data.animals[1].contact)
            // console.log(response.data.animals[1].photos[0])
            res.render('dogs/index.ejs', {
                user: foundUser,
                dogs: response.data.animals,
            })
        })
        .catch((error) => {
            console.log('ERROR >>> ', error)
        }) 
    })
})

// CREATE DOG
router.post('/:animalId', (req, res) => {
    let animalId = req.params.animalId
    axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `https://api.petfinder.com/v2/animals/${animalId}`,
    })
    .then(response => {
        console.log('response received')
        console.log(response.data.animal)
        let dog = response.data.animal
        let newDog = {
            animalId: dog.id,
            name: dog.name,
            breed: dog.breeds.primary,
            color: dog.colors.primary,
            age: dog.age,
            gender: dog.gender,
            size: dog.size,
            interestedOwners: 1,
        }
        Dog.create(newDog, (error, createdDog) => {
            if(error) res.send(error)
            res.send(createdDog)
        })
    })
    .catch((error) => {
        console.log('ERROR >>> ', error)
    }) 
})


module.exports = router