const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Dog = require('../models/dog')

// USER LOGIN SCREEN
router.get('/login',(req, res) => {
    // render login screen
    res.render('users/login.ejs')
})

// USER LOGIN AUTH
router.post('/login', (req, res) => {
    // Look for username
    User.findOne({username: req.body.username}, (error, foundUser) => {
        // if there's an error
        if(error){
            res.send(error)
        }
        // if user not found 
        else if(!foundUser){
            res.send('<a  href="/users/login">Sorry, no user found </a>')
        }
        //compare entered password to db password
        else {
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                res.redirect(`/users/${foundUser._id}/`)
            } else {
                res.send('<a href="/users/login"> password does not match </a>')
            }
        }  
    })
})

// NEW USER
router.get('/new', (req, res) => {
    // render page to add a new user
    res.render('users/new.ejs')
})

// USER SHOW PAGE
router.get('/:id/view', (req, res) => {
    // find the user who's information you want to display on the screen
    // use the userId from the request to do this
    // need to use populate() in order to show dog information on the page
    User.findById(req.params.id)
    .populate('favoriteDogs')
    .exec((error, foundUser) => {
        if(error){
            console.log('ERROR >>>> ', error)
        }
        // render the user show page and pass in the user object that you found from the query
        res.render('users/show.ejs', {
            user: foundUser
        })
    })
})

// INDEX PAGE - not really an index page, this is the page the user lands on after logging in to the 
// application. This application isn't supposed to have a way to view all users. 
// A standard index route was made for the dog model
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        if(error) res.send(error)

        // render nav.ejs as a landing page for users after they login
        res.render('partials/nav.ejs', {
            user: foundUser
        })
    })
})

// EDIT PAGE
router.get('/:id/edit', (req, res) =>{
    // get user id from request params
    let user_id = req.params.id

    // find the user whose information you want to edit
    User.findById(user_id, (error, foundUser) => {
        if(error) res.send(error)

        // render the edit page with pre-populated data from the user's document in the DB
        res.render('users/edit.ejs', {
            user: foundUser,
        })
    })
})

// UPDATE - this route will be hit to update the user object
router.put('/:id', (req, res) => {
    // get updated object through request.body
    // get Id to update through req.params
    User.findByIdAndUpdate(req.params.id, req.body, (error, updatedUser) => {
        if(error) res.send(error)

        // user gets redirected to initial landing page --> this will have to be changed later
        // logically, it should go back to the user show page
        res.redirect(`/users/${updatedUser._id}/`)
    })
})

// CREATE NEW USER - route is hit when a new user is being created
router.post('/', (req, res) => {
    // encrypt the password entered by the user
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    //create the user with req.body (which now has the encrypted password)
    User.create(req.body, (error, createdUser) => {
        if(error) res.send(error)

        // redirect to landing page
        res.redirect(`/users/${createdUser._id}/`)
    })
})

// DELETE ACCOUNT
router.delete('/:id', (req, res) => {
    // delete account record using the userId passed in from req.params
    User.findByIdAndRemove(req.params.id, (error, deletedUser) => {
        
        // redirect to login page
        res.redirect('/users/login')
    })
})

module.exports = router