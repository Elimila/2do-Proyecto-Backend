require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))
app.use('/comments', require('./routes/comments'))

app.get('/', (req, res) => {
  res.send('Servidor funcionando')
})

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas (SocialMedia)')
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
  })
  .catch(err => console.error(err))


