const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')
const { authentication } = require('../middlewares/authentication')
const isCommentAuthor = require('../middlewares/isCommentAuthor')
const upload = require('../middlewares/upload') 

// Crear comentario en un post
router.post('/:postId', authentication, upload.single('image'), CommentController.create)

// Actualizar comentario
router.put('/:id', authentication, isCommentAuthor, CommentController.update)

// Eliminar comentario
router.delete('/:id', authentication, isCommentAuthor, CommentController.delete)

module.exports = router
