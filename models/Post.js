const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }]
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

module.exports = Post

