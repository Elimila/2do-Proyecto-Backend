const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')
const { authentication } = require('../middlewares/authentication')
const isCommentAuthor = require('../middlewares/isCommentAuthor')
const upload = require('../middlewares/upload') 


// Crear comentario en un post
router.post('/:postId', authentication, upload.single('image'), CommentController.create)

// ver comertario 
router.get('/:id', CommentController.getById)

// Obtener todos los comentarios
router.get('/', CommentController.getAll)

// Actualizar comentario (solo el autor puede hacerlo)
router.put('/:id', authentication, isCommentAuthor, upload.single('image'), CommentController.update)

// Dar like a un comentario
router.put('/like/:id', authentication, CommentController.like)

// Quitar like a un comentario
router.put('/unlike/:id', authentication, CommentController.unlike)

// Eliminar comentario
router.delete('/:id', authentication, isCommentAuthor, CommentController.delete)


module.exports = router
