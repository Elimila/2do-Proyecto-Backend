const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/authentication')
const upload = require('../middlewares/upload')

router.post('/', upload.single('avatar'), UserController.register)
router.post('/login', UserController.login)
router.delete('/logout', authentication, UserController.logout)
router.get('/info', authentication, UserController.getInfo)
router.put('/avatar', authentication, upload.single('avatar'), UserController.updateAvatar)

module.exports = router
