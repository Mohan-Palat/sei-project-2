const mongoose = require('mongoose')

const dogSchema = new mongoose.Schema({
    animalId: { type: String, unique: true, required: true },
    name: String,
    breed: String,
    color: String,
    age: String,
    gender: String,
    size: String,
    interestedOwners: Number,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    postcode: String,
    country: String,
})

const Dog = mongoose.model('Dog', dogSchema)
module.exports = Dog