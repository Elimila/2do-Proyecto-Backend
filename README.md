# 📸 Proyecto Backend - SocialMedia

Este proyecto es una API RESTful desarrollada con **Node.js**, **Express**, **MongoDB** y **Mongoose**. Permite la gestión de usuarios, posts y comentarios, con funcionalidades como autenticación, likes, followers y carga de imágenes. Incluye también documentación Swagger para todos los endpoints.

## 🚀 Tecnologías

- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- JWT
- Bcrypt
- Multer
- Nodemailer
- Swagger (Documentación)
- Dotenv

## 🧑‍💻 Funcionalidades principales

### ✅ Autenticación y autorización

- Registro de usuarios con confirmación de correo electrónico
- Login con JWT
- Logout (elimina el token del usuario)
- Middleware de autenticación para rutas protegidas

### 🧾 Usuarios

- Registrar usuario con imagen de perfil
- Confirmar cuenta vía email
- Iniciar sesión (solo si el correo está confirmado)
- Consultar datos del usuario autenticado (`/users/info`)
- Subir/actualizar avatar
- Seguir y dejar de seguir usuarios
- Ver seguidores (con nombre y email)

### 📝 Posts

- Crear post con título, contenido e imagen
- Obtener todos los posts con autor y comentarios
- Buscar post por título o ID
- Actualizar y eliminar (solo el autor)
- Likes: dar y quitar like
- Paginación de posts

### 💬 Comentarios

- Crear, editar y eliminar comentarios (con imagen opcional)
- Middleware para comprobar la autoría al modificar/eliminar
- Likes a comentarios
- Buscar comentario por ID

### 📚 Documentación

Accede a la documentación completa de los endpoints con Swagger:
http://localhost:3000/api-docs

---

## 📁 Estructura del proyecto

```
.
├── config/
│   └── nodemailer.js
├── controllers/
│   ├── UserController.js
│   ├── PostController.js
│   └── CommentController.js
├── docs/
│   └── swagger.json
├── middlewares/
│   ├── authentication.js
│   ├── isAuthor.js
│   ├── isCommentAuthor.js
│   └── upload.js
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── routes/
│   ├── users.js
│   ├── posts.js
│   └── comments.js
├── uploads/
├── index.js
├── .env
└── README.md
```

---

## 🔐 Variables de entorno

Crea un archivo `.env` con el siguiente contenido:

```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=tu_jwt_secret
EMAIL_FROM=tu_correo@gmail.com
EMAIL_PASS=contraseña_app_gmail
PORT=3000
```

---

## ✅ Puntos extra implementados

- [x] Middleware `isAuthor` para editar/eliminar posts
- [x] Middleware `isCommentAuthor` para comentarios
- [x] Multer para imágenes en usuarios, posts y comentarios
- [x] Confirmación de cuenta por correo
- [x] Validación de login solo si se ha confirmado el correo
- [x] Sistema de followers/following
- [x] Endpoint `/users/info` con posts, número y lista de followers
- [x] Likes a posts y comentarios
- [x] Documentación completa con Swagger (`swagger.json`)
- [x] Filtro por título (posts)
- [x] Búsqueda por ID y nombre (usuarios)
- [x] Paginación en posts

---

## 💻 Cómo ejecutar el proyecto

```bash
git clone https://github.com/tu_usuario/tu_repo.git
cd tu_repo
npm install
npm run dev


## 🙋 Autora

**Elida Rodriguez**
Bootcamp Desarrollo Web Fullstack
The Bridge


```
