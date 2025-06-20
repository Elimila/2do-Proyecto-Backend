const Post = require('../models/Post')

const PostController = {
  async create(req, res) {
    try {
      const { title, content, image } = req.body

      // Validación de campos obligatorios
      if (!title || !content) {
        return res.status(400).send({ message: 'Título y contenido son obligatorios' })
      }

      const post = await Post.create({
        title,
        content,
        image,
        author: req.user._id
      })

      res.status(201).send({ message: 'Post creado con éxito', post })
    } catch (error) {
      console.error('Error al crear el post:', error.message)
      res.status(500).send({ message: 'Error al crear el post' })
    }
  },

  async getAll(req, res) {
  try {
    const posts = await Post.find().populate('author', 'name email') // Solo muestra name y email del autor
    res.send(posts)
  } catch (error) {
    console.error('Error al obtener los posts:', error.message)
    res.status(500).send({ message: 'Error al obtener los posts' })
  }
},
  async getByTitle(req, res) {
  try {
    const title = req.params.title
    const posts = await Post.find({
      title: { $regex: title, $options: 'i' } // búsqueda insensible a mayúsculas
    }).populate('author', 'name email')

    if (posts.length === 0) {
      return res.status(404).send({ message: 'No se encontraron posts con ese título' })
    }

    res.send(posts)
  } catch (error) {
    console.error('Error al buscar por título:', error.message)
    res.status(500).send({ message: 'Error al buscar posts' })
  }
},
  async getById(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email')

    if (!post) {
      return res.status(404).send({ message: 'Post no encontrado' })
    }

    res.send(post)
  } catch (error) {
    console.error('Error al buscar por ID:', error.message)
    res.status(500).send({ message: 'Error al buscar el post' })
  }
}

}

module.exports = PostController
