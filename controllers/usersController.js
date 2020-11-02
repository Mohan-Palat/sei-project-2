const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Dog = require('../models/dog')

// USER LOGIN
router.get('/login',(req, res) => {
    res.render('users/login.ejs')
})

// NEW USER
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// USER SHOW PAGE
router.get('/:id/view', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        if(error) res.send(error)
        res.render('users/show.ejs', {
            user: foundUser
        })
    })
})

// INDEX PAGE
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        if(error) res.send(error)
        res.render('main.ejs', {
            user: foundUser
        })
    })
})

// EDIT PAGE
router.get('/:id/edit', (req, res) =>{
    let user_id = req.params.id
    User.findById(user_id, (error, foundUser) => {
        if(error) res.send(error)
        res.render('users/edit.ejs', {
            user: foundUser,
        })
    })
})

// UPDATE
router.put('/:id', (req, res) => {
    console.log('line 41')
    User.findByIdAndUpdate(req.params.id, req.body, (error, updatedUser) => {
        if(error) res.send(error)
        res.redirect(`/users/${updatedUser._id}/`)
    })
})

// CREATE NEW USER
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (error, createdUser) => {
        if(error) res.send(error)
        res.redirect(`/users/${createdUser._id}/`)
    })
})

module.exports = router