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
        // Find user in DB to get zipcode & to pass user info to index page
        let zipCode = foundUser.zipCode
        
        // Call API to get information on nearby dogs
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: `https://api.petfinder.com/v2/animals?type=dog&location=${zipCode}`,
        })
        .then(response => {
            // if you get successful response, render dog index page
            res.render('dogs/index.ejs', {
                user: foundUser,
                dogs: response.data.animals,
            })
        })
        .catch((error) => {
            console.log('ERROR >>> ', error.response.data)
        }) 
    })
})

router.get('/:userId/advancedSearch', (req, res) => {
    // variables from request, used to search the api for specific breed/gender
    let userId = req.params.userId
    let gender = req.body.gender
    let breed = req.body.breed

    User.findById(userId, (error, foundUser) => {
        if(error) res.send(error)

        //find user to get zipcode
        let zipCode = foundUser.zipCode

        //call api and filter by zipcode, gender, and breed
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: `https://api.petfinder.com/v2/animals?type=dog&location=${zipCode}&gender=${gender}&breed=${breed}`,
        })
        .then(response => {
            // if response is okay, render index page with dogs that match criteria
            res.render('dogs/index.ejs', {
                user: foundUser,
                dogs: response.data.animals,
            })
        })
        .catch((error) => {
            console.log('ERROR >>> ', error.response.data)
        }) 
    })
})

// CREATE DOG
router.post('/:userId/:animalId', (req, res) => {
    // get dog object id and user id from request
    let animalId = req.params.animalId
    let userId = req.params.userId

    // Check if Animal Id is already in Database
    Dog.find({animalId: animalId}, (error, foundDog) => {
        if(error) {
            res.send(error)
        }
        //If the dog is not in the DB, find it in the api, add it to the DB and update the user object
        else if(!foundDog.length){
            axios({
                method: 'get',
                headers: { Authorization: `Bearer ${token}` },
                url: `https://api.petfinder.com/v2/animals/${animalId}`,
            })
            .then(response => {
                // create Dog object
                let dog = response.data.animal
                let contact = dog.contact
                let newDog = {
                    animalId: dog.id,
                    name: dog.name,
                    breed: dog.breeds.primary,
                    color: dog.colors.primary,
                    age: dog.age,
                    gender: dog.gender,
                    size: dog.size,
                    interestedOwners: 1,
                    email: contact.email,
                    phone: contact.phone,
                    street: contact.address.address1,
                    city: contact.address.city,
                    state: contact.address.state,
                    postcode: contact.address.postcode,
                    country: contact.address.country,
                }
                // insert created objected into DB
                Dog.create(newDog, (error, createdDog) => {
                    if(error) res.send(error)
        
                    //Find user and add Dog & save user
                    User.findById(userId, (error, foundUser) => {
                        foundUser.favoriteDogs.push(createdDog)
                        foundUser.save(function (error, savedUser) {
                            if(error) console.log(error)
                        })
                    })
                })
                // redirect to index page
                res.redirect(`/dogs/${userId}`)
            })
            .catch((error) => {
                console.log('ERROR >>> ', error)
            }) 
        }
        //If Dog is found in DB, add it as a reference to User Object
        else{
            User.findById(userId, (error, foundUser) => {
                if(error){
                    console.log('EXISTING DOG ERROR >>> ', error)
                }

                //update interested owners in foundDog
                foundDog[0].interestedOwners++

                //save found Dog
                foundDog[0].save(function (error, savedDog) {
                    if(error) res.send(error)
                })
                
                //add dog to user and save user record
                foundUser.favoriteDogs.push(foundDog[0])
                foundUser.save(function (error, savedUser) {
                    if(error) console.log(error)
                })
            })
            //redirect to index
            res.redirect(`/dogs/${userId}`)
        }
    })
})

// VIEW FAVORITE DOGS
router.get('/:userId/favoriteDogs', (req, res) => {
    // in order to get specific information about the dogs from a user document, use populate
    User.findById(req.params.userId)
    .populate('favoriteDogs')
    .exec((error, foundUser) => {
        if(error){
            console.log('ERROR >>>> ', error)
        }

        // render favorite Dogs page & pass it the dogs from the populate() query
        let dogs = foundUser.favoriteDogs
        res.render('dogs/favoriteDogs.ejs', {
            user: foundUser,
            dogs: dogs,
        })
    })
})

// DELETE FROM FAVORITE DOGS
router.delete('/:userId/:animalId', (req, res) => {
    //save req params in variables
    let userId = req.params.userId
    let animalId = req.params.animalId

    // find user in DB
    User.findById(userId, (error, foundUser) => {
        // find the index of the dog you want to remove, and then remove from the array
        let dogs = foundUser.favoriteDogs           // Dogs array
        let index = dogs.indexOf(animalId)          // Find index of dog you want to remove
        dogs.splice(index,1)                        // Use splice to remove element at that index

        //save foundUser
        foundUser.save(function (error, savedUser) {
            if(error) res.send(error)
        })

        // find dog in DB in order to: 
        // update interested owners account (need to subtract 1 since its being removed)
        Dog.findById(animalId, (error, foundDog) => {
            if(error) res.send(error)
            foundDog.interestedOwners--

            // save found Dog
            foundDog.save(function(error, savedDog) {
                if(error) res.send(error)
            })
        })
    })

    // redirect to favorite Dogs page
    res.redirect(`/dogs/${userId}/favoriteDogs`)

})

module.exports = router