const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Dog = require('../models/dog')

// NEW USER
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// USER SHOW PAGE
router.get('/:id/view', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('users/show.ejs', {
            user: foundUser
        })
    })
})

// INDEX PAGE
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('main.ejs', {
            user: foundUser
        })
    })
})

// EDIT PAGE
router.get('/:id/edit', (req, res) =>{
    let user_id = req.params.id
    User.findById(user_id, (error, foundUser) => {
        
    })
})

// CREATE NEW USER
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        res.redirect(`/${createdUser._id}`)
    })
})

module.exports = router