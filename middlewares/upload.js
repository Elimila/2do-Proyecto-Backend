const multer = require('multer')
const path = require('path')

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// Filtro para permitir solo imágenes
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten imágenes (jpg, jpeg, png)'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB máximo
})

module.exports = upload
