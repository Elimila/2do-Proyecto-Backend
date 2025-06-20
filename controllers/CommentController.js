const Comment = require('../models/Comment')

const CommentController = {
  async create(req, res) {
    try {
      const { text } = req.body
      const postId = req.params.postId
      const author = req.user._id

      if (!text) {
        return res.status(400).send({ message: 'El comentario no puede estar vacío' })
      }

      const comment = await Comment.create({ text, author, postId })
      res.status(201).send({ message: 'Comentario creado con éxito', comment })
    } catch (error) {
      console.error('Error al crear comentario:', error.message)
      res.status(500).send({ message: 'Error al crear comentario' })
    }
  }
}

module.exports = CommentController
