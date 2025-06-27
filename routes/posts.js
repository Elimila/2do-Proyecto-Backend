const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const { authentication, isAuthor } = require('../middlewares/authentication')
const upload = require('../middlewares/upload')

// Crear post con imagen
router.post('/', authentication, upload.single('image'), PostController.create)

router.get('/', PostController.getAll)
router.get('/title/:title', PostController.getByTitle)
router.get('/id/:id', PostController.getById)
router.get('/paginated', PostController.getPaginated)
router.get('/full', PostController.getFull)

router.put('/like/:id', authentication, PostController.like)
router.put('/unlike/:id', authentication, PostController.unlike)
router.put('/:id', authentication, isAuthor, upload.single('image'), PostController.update)
router.delete('/:id', authentication, isAuthor, PostController.delete)


module.exports = router
