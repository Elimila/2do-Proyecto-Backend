const Comment = require('../models/Comment')

const isCommentAuthor = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)

    if (!comment) {
      return res.status(404).send({ message: 'Comentario no encontrado' })
    }

    // Verifica si el usuario conectado es el autor del comentario
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'No eres el autor de este comentario' })
    }

    next()
  } catch (error) {
    console.error('Error en isCommentAuthor:', error.message)
    res.status(500).send({ message: 'Error de autorización en comentario' })
  }
}

module.exports = isCommentAuthor
