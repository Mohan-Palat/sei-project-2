const mongoose = require('mongoose')

const dogSchema = new mongoose.Schema({
    animalId: { type: String, unique: true, required: true },
    name: String,
    breed: String,
    color: String,
    age: String,
    gender: String,
    size: String,
    interestedOwners: Number
})

const Dog = mongoose.model('Dog', dogSchema)
module.exports = Dog