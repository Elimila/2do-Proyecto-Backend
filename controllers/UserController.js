const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { jwt_secret } = require('../config/keys')
const Post = require('../models/Post')
const transporter = require('../config/nodemailer')

const UserController = {
async register(req, res) {
    try {
      const { name, email, password, age } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!name || !email || !password) {
        return res.status(400).send({ message: 'Faltan campos obligatorios' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const emailtoken = crypto.randomBytes(20).toString('hex'); // 🔐 Token de confirmación

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        age,
        role: 'user',
        tokens: [],
        avatar: image,
        emailtoken,
        confirmed: false
      });

      // Enviar email con el token
      const confirmationUrl = `http://localhost:3000/users/confirm/${emailtoken}`;
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Confirma tu cuenta',
        html: `<h2>Hola ${user.name}</h2>
               <p>Gracias por registrarte. Por favor confirma tu cuenta haciendo clic en el siguiente enlace:</p>
               <a href="${confirmationUrl}">Confirmar cuenta</a>`
      });

      res.status(201).send({ message: 'Usuario registrado. Revisa tu correo para confirmar tu cuenta.', user });
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
      res.status(500).send({ message: 'Error al registrar el usuario' });
    }
  },

  async login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) return res.status(401).send({ message: 'Usuario no encontrado' })

    // ✅ Verifica si el usuario confirmó su correo
    if (!user.confirmed) {
      return res.status(403).send({ message: 'Debes confirmar tu correo antes de iniciar sesión' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).send({ message: 'Contraseña incorrecta' })

    const token = jwt.sign({ _id: user._id }, jwt_secret)
    if (user.tokens.length >= 3) user.tokens.shift()
    user.tokens.push(token)
    await user.save()

    res.send({ message: `Bienvenid@ ${user.name}`, token })
  } catch (error) {
    console.error('Error en el login:', error.message)
    res.status(500).send({ message: 'Error en el login' })
  }
},

async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization }
      })
      res.send({ message: 'Desconectado con éxito' })
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message)
      res.status(500).send({ message: 'Error al intentar cerrar sesión' })
    }
  },

async getInfo(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .populate('followers', 'name email') // Muestra nombre y email de los seguidores
      .lean(); // Convierte el documento Mongoose a objeto JavaScript

    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    // Contar seguidores
    const followerCount = user.followers.length;

    // Obtener posts del usuario
    const posts = await Post.find({ author: req.user._id });

    res.send({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        role: user.role,
        avatar: user.avatar || null,
        followerCount
      },
      posts
    });
  } catch (error) {
    console.error('Error al obtener info del usuario:', error.message);
    res.status(500).send({ message: 'Error al obtener la información' });
  }
  },

  async updateAvatar(req, res) {
    try {
      const avatar = req.file ? req.file.filename : null
      if (!avatar) return res.status(400).send({ message: 'No se subió ninguna imagen' })

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { avatar },
        { new: true }
      )

      res.send({ message: 'Avatar actualizado con éxito', user })
    } catch (error) {
      console.error('Error al actualizar el avatar:', error.message)
      res.status(500).send({ message: 'Error al actualizar avatar' })
    }
  },

  async follow(req, res) {
    try {
      const userToFollowId = req.params.id
      const userLoggedInId = req.user._id

      if (userToFollowId === userLoggedInId.toString()) {
        return res.status(400).send({ message: 'No puedes seguirte a ti mismo' })
      }

      const user = await User.findById(userToFollowId)
      if (!user) return res.status(404).send({ message: 'Usuario a seguir no encontrado' })

      if (user.followers.includes(userLoggedInId)) {
        return res.status(400).send({ message: 'Ya sigues a este usuario' })
      }

      user.followers.push(userLoggedInId)
      await user.save()

      res.send({ message: 'Ahora sigues a este usuario', user })
    } catch (error) {
      console.error('Error al seguir usuario:', error.message)
      res.status(500).send({ message: 'Error al seguir usuario' })
    }
  },

  async unfollow(req, res) {
    try {
      const userToUnfollowId = req.params.id
      const userLoggedInId = req.user._id

      const user = await User.findById(userToUnfollowId)
      if (!user) return res.status(404).send({ message: 'Usuario a dejar de seguir no encontrado' })

      user.followers = user.followers.filter(
        followerId => followerId.toString() !== userLoggedInId.toString()
      )
      await user.save()

      res.send({ message: 'Has dejado de seguir al usuario', user })
    } catch (error) {
      console.error('Error al dejar de seguir:', error.message)
      res.status(500).send({ message: 'Error al dejar de seguir' })
    }
    
  },

  async confirmEmail(req, res) {
  try {
    const user = await User.findOne({ emailtoken: req.params.emailtoken });

    if (!user) {
      return res.status(400).send({ message: 'Token inválido' });
    }

    user.confirmed = true;
    user.emailtoken = null;
    await user.save();

    res.send({ message: 'Cuenta confirmada con éxito. Ahora puedes iniciar sesión.' });
  } catch (error) {
    console.error('Error al confirmar el email:', error.message);
    res.status(500).send({ message: 'Error al confirmar el email' });
  }
}

}

module.exports = UserController


