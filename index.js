const express = require('express')
const mongoose = require('mongoose')
const { MONGO_URI } = require('./config/keys') //Importamos la URI de Atlas

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))
app.use('/comments', require('./routes/comments'))



app.get('/', (req, res) => {
  res.send('Servidor funcionando')
})

// Conexión a MongoDB Atlas usando la URI nueva
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB Atlas (SocialMedia)')
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
  })
  .catch(err => console.error(err))

