const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'El comentario no puede estar vacío']
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: ObjectId,
    ref: 'Post',
    required: true
  }
}, { timestamps: true })

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment
