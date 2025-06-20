const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const { authentication } = require('../middlewares/authentication')

// Crear un post (autenticado)
router.post('/', authentication, PostController.create)

router.get('/', PostController.getAll)
router.get('/title/:title', PostController.getByTitle)
router.get('/id/:id', PostController.getById)




module.exports = router
