const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  name: String,
  favoriteDogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dog'
  }],
  zipCode: Number,
})

const User = mongoose.model('User', userSchema)
module.exports = User