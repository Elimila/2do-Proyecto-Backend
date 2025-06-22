const Post = require('../models/Post')

const PostController = {
  async create(req, res) {
    try {
      const { title, content } = req.body
      const image = req.file ? req.file.filename : null
      const author = req.user._id

      if (!title || !content) {
        return res.status(400).send({ message: 'Título y contenido son obligatorios' })
      }

      const post = await Post.create({
        title,
        content,
        image,
        author
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
},

  async getPaginated(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query

    const posts = await Post.find()
      .populate('author', 'name email')
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))

    res.send(posts)
  } catch (error) {
    console.error('Error en paginación:', error.message)
    res.status(500).send({ message: 'Error al paginar los posts' })
  }
},

  async like(req, res) {
  try {
    const postId = req.params.id
    const userId = req.user._id

    const post = await Post.findById(postId)
    if (!post) return res.status(404).send({ message: 'Post no encontrado' })

    // Verifica si ya dio like
    if (post.likes.includes(userId)) {
      return res.status(400).send({ message: 'Ya diste like a este post' })
    }

    post.likes.push(userId)
    await post.save()

    res.send({ message: 'Like añadido', post })
  } catch (error) {
    console.error('Error al dar like:', error.message)
    res.status(500).send({ message: 'Error al dar like' })
  }
}, 

  async unlike(req, res) {
  try {
    const postId = req.params.id
    const userId = req.user._id

    const post = await Post.findById(postId)
    if (!post) return res.status(404).send({ message: 'Post no encontrado' })

    post.likes = post.likes.filter(likeId => likeId.toString() !== userId.toString())
    await post.save()

    res.send({ message: 'Like eliminado', post })
  } catch (error) {
    console.error('Error al quitar like:', error.message)
    res.status(500).send({ message: 'Error al quitar like' })
  }
},

  async update(req, res) {
  try {
    const { title, content, image } = req.body

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true }
    )

    res.send({ message: 'Post actualizado con éxito', post: updatedPost })
  } catch (error) {
    console.error('Error al actualizar el post:', error.message)
    res.status(500).send({ message: 'Error al actualizar el post' })
  }
},

  async delete(req, res) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id)
    res.send({ message: 'Post eliminado con éxito', post: deletedPost })
  } catch (error) {
    console.error('Error al eliminar el post:', error.message)
    res.status(500).send({ message: 'Error al eliminar el post' })
  }
}

}

module.exports = PostController
