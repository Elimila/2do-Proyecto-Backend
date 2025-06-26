const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: Number,
  tokens: [String],
  role: {
    type: String,
    default: 'user'
  },
  avatar: {
  type: String,
  default: ''
  }
}, { timestamps: true })

// Para ocultar password y tokens al responder
UserSchema.methods.toJSON = function () {
  const user = this._doc
  delete user.password
  delete user.tokens
  return user
}

const User = mongoose.model('User', UserSchema)
module.exports = User
