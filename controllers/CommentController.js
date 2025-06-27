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
      const image = req.file ? req.file.filename : null
      const commentId = req.params.id

      const updateData = {}
      if (text) updateData.text = text
      if (image) updateData.image = image

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        updateData,
        { new: true }
      )

      if (!updatedComment) {
        return res.status(404).send({ message: 'Comentario no encontrado' })
      }

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
      if (!deletedComment) {
        return res.status(404).send({ message: 'Comentario no encontrado' })
      }

      res.send({ message: 'Comentario eliminado con éxito', comment: deletedComment })
    } catch (error) {
      console.error('Error al eliminar comentario:', error.message)
      res.status(500).send({ message: 'Error al eliminar comentario' })
    }
  },

  async getById(req, res) {
    try {
      const comment = await Comment.findById(req.params.id).populate('author', 'name email')
      if (!comment) return res.status(404).send({ message: 'Comentario no encontrado' })
      res.send(comment)
    } catch (error) {
      console.error('Error al obtener el comentario:', error.message)
      res.status(500).send({ message: 'Error al obtener el comentario' })
    }
  },

  async getAll(req, res) {
    try {
      const comments = await Comment.find().populate('author', 'name email')
      res.send(comments)
    } catch (error) {
      console.error('Error al obtener los comentarios:', error.message)
      res.status(500).send({ message: 'Error al obtener comentarios' })
    }
  },

async like(req, res) {
  try {
    const commentId = req.params.id
    const userId = req.user._id

    const comment = await Comment.findById(commentId)
    if (!comment) return res.status(404).send({ message: 'Comentario no encontrado' })

    if (comment.likes.includes(userId)) {
      return res.status(400).send({ message: 'Ya diste like a este comentario' })
    }

    comment.likes.push(userId)
    await comment.save()

    res.send({ message: 'Like añadido al comentario', comment })
  } catch (error) {
    console.error('Error al dar like al comentario:', error.message)
    res.status(500).send({ message: 'Error al dar like al comentario' })
  }
},

async unlike(req, res) {
  try {
    const commentId = req.params.id
    const userId = req.user._id

    const comment = await Comment.findById(commentId)
    if (!comment) return res.status(404).send({ message: 'Comentario no encontrado' })

    comment.likes = comment.likes.filter(id => id.toString() !== userId.toString())
    await comment.save()

    res.send({ message: 'Like eliminado del comentario', comment })
  } catch (error) {
    console.error('Error al quitar like del comentario:', error.message)
    res.status(500).send({ message: 'Error al quitar like del comentario' })
  }
}

}

module.exports = CommentController

