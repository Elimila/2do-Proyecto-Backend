const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const { authentication } = require('../middlewares/authentication')

// Crear Endpoints 
router.post('/', authentication, PostController.create)
router.get('/', PostController.getAll)
router.get('/title/:title', PostController.getByTitle)
router.get('/id/:id', PostController.getById)
router.get('/paginated', PostController.getPaginated)
router.put('/like/:id', authentication, PostController.like)
router.put('/unlike/:id', authentication, PostController.unlike)



module.exports = router
