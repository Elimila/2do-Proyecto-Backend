
# 2do Proyecto Backend - Social Media API

## 🚀 Descripción
Este proyecto es una **API RESTful** desarrollada con **Node.js**, **Express** y **MongoDB** usando **Mongoose**. Permite gestionar usuarios, publicaciones (posts), comentarios y likes, incluyendo autenticación segura con JWT y despliegue en producción mediante **Render**.

---

## 🛠 Tecnologías utilizadas
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Bcrypt
- JSON Web Tokens (JWT)
- Nodemon
- Render (despliegue)
- Postman (pruebas de endpoints)

---

## 📂 Estructura del proyecto
```
.
├── controllers
├── middlewares
├── models
├── routes
├── config
├── .env
├── .gitignore
├── index.js
├── package.json
```

---

## ⚙ Variables de entorno (.env)
```
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/SocialMedia
JWT_SECRET=bootcamp2025
```

---

## ✅ Instalación local
```bash
git clone https://github.com/Elimila/2do-Proyecto-Backend.git
cd 2do-Proyecto-Backend
npm install
npm run dev
```

---

## 🔐 Autenticación
- Registro y login con **bcrypt** y **JWT**
- Middleware de autenticación `authentication`
- Middleware de autorización `isAuthor` para editar/eliminar posts propios

---

## 🔧 Funcionalidades principales

### Usuarios
- Registro (`POST /users`)
- Login (`POST /users/login`)
- Logout (`DELETE /users/logout`)
- Info usuario logueado (`GET /users/info`)

### Posts
- Crear post (`POST /posts`)
- Ver todos (`GET /posts`)
- Buscar por título (`GET /posts/title/:title`)
- Buscar por ID (`GET /posts/id/:id`)
- Paginación (`GET /posts/paginated?page=1&limit=10`)
- Like (`PUT /posts/like/:id`)
- Unlike (`PUT /posts/unlike/:id`)
- Editar (`PUT /posts/:id`)
- Eliminar (`DELETE /posts/:id`)

### Comentarios
- Crear comentario en post (`POST /comments/:postId`)

---

## 🌐 Enlace de producción (Render)
```
https://twodo-proyecto-backend.onrender.com
```

---

## 🧪 Pruebas con Postman
Importar la colección:
`postman_twodo_backend_render.json`

Incluye:
- Login
- Crear post

---

## 📌 Comandos frecuentes
```bash
npm init -y
npm install express mongoose dotenv bcrypt jsonwebtoken
npm install --save-dev nodemon
git init
git add .
git commit -m "init: estructura base"
git checkout -b develop
git push origin develop
```

---

## 🙋 Autora
**Elida Rodriguez**  
Bootcamp Desarrollo Web Fullstack - The Bridge
