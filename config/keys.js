require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET
}