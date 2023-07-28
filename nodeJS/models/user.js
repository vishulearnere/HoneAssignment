const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: [40, 'Username can not be more than 40 characters'],
    minlength: [3, 'Username can not be less than 3 characters'],
  },
  age: {
    type: Number,
    default: 20,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: [6, 'Passsword can not be less than 6 Characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})
//validation

module.exports = mongoose.model('User', UserSchema)
