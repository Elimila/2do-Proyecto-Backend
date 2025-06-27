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
router.post('/follow/:id', authentication, UserController.follow)
router.post('/unfollow/:id', authentication, UserController.unfollow)
router.get('/confirm/:emailtoken', UserController.confirmEmail)
router.get('/search/:name', UserController.getByName)
router.get('/id/:id', UserController.getById)




module.exports = router
