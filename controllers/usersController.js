const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Dog = require('../models/dog')

// INDEX PAGE
router.get('/', (req, res) => {
    let allUsers = User.find({})
    res.render('')
})

// NEW USER
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// CREATE NEW USER
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        console.log(createdUser)
        res.send(createdUser)
    })
})

module.exports = router