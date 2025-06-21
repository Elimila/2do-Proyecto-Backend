const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/keys')
const Post = require('../models/Post')

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const payload = jwt.verify(token, jwt_secret)

    const user = await User.findOne({ _id: payload._id, tokens: token })
    if (!user) {
      return res.status(401).send({ message: 'No autorizado' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error(error)
    res.status(401).send({ message: 'Token inválido' })
  }
}


const isAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).send({ message: 'Post no encontrado' })

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).send({ message: 'No eres el autor de este post' })
    }

    next()
  } catch (error) {
    console.error('Error en isAuthor:', error.message)
    res.status(500).send({ message: 'Error de autorización' })
  }
}

module.exports = { authentication, isAuthor }
