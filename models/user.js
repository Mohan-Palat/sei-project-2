const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  name: String,
  favoriteDogs: [{
      type: mongoose.Schema.types.ObjectId,
      ref: 'Dog'
  }],
  zipCode: Number,
})

const User = mongoose.model('User', userSchema)
module.exports = User