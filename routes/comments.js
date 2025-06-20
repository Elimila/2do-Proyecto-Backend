const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')
const { authentication } = require('../middlewares/authentication')

// Crear comentario en un post
router.post('/:postId', authentication, CommentController.create)

module.exports = router
