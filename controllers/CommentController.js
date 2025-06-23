const Comment = require('../models/Comment')

const CommentController = {
  async create(req, res) {
    try {
      const { text } = req.body
      const postId = req.params.postId
      const author = req.user._id
      const image = req.file ? req.file.filename : null

      if (!text) {
        return res.status(400).send({ message: 'El comentario no puede estar vacío' })
      }

      const comment = await Comment.create({ text, image, author, postId })
      res.status(201).send({ message: 'Comentario creado con éxito', comment })
    } catch (error) {
      console.error('Error al crear comentario:', error.message)
      res.status(500).send({ message: 'Error al crear comentario' })
    }
  },

  async update(req, res) {
    try {
      const { text } = req.body
      const commentId = req.params.id

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { text },
        { new: true }
      )

      res.send({ message: 'Comentario actualizado con éxito', comment: updatedComment })
    } catch (error) {
      console.error('Error al actualizar comentario:', error.message)
      res.status(500).send({ message: 'Error al actualizar comentario' })
    }
  },

  async delete(req, res) {
    try {
      const commentId = req.params.id

      const deletedComment = await Comment.findByIdAndDelete(commentId)
      res.send({ message: 'Comentario eliminado con éxito', comment: deletedComment })
    } catch (error) {
      console.error('Error al eliminar comentario:', error.message)
      res.status(500).send({ message: 'Error al eliminar comentario' })
    }
  }
}

module.exports = CommentController

