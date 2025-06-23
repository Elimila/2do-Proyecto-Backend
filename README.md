
# 2do Proyecto Backend - Social Media API

## 🚀 Descripción
Este es un proyecto backend desarrollado en **Node.js** y **Express**, con base de datos en **MongoDB Atlas** usando **Mongoose**. Permite la gestión de usuarios, posts, comentarios y likes. Implementa autenticación con **JWT**, validaciones y despliegue en producción con **Render**.

---

## 🛠 Tecnologías utilizadas
- Node.js
- Express
- MongoDB + Mongoose
- JWT + Bcrypt
- Dotenv
- Nodemon
- Render (producción)
- Postman (pruebas)

---

## 📁 Estructura del proyecto
```
.
├── controllers/
├── middlewares/
├── models/
├── routes/
├── config/
├── .env
├── .gitignore
├── index.js
├── package.json
```

---

## 🔐 Variables de entorno (.env)
```
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/SocialMedia
JWT_SECRET=bootcamp2025
```

Estas variables se usan en `index.js` y `config/keys.js` mediante `dotenv`.

---

## ✅ Instalación local

```bash
git clone https://github.com/Elimila/2do-Proyecto-Backend.git
cd 2do-Proyecto-Backend
npm install
npm run dev
```

---

## 🔧 Funcionalidades

### Usuarios
- Registro: `POST /users`
- Login: `POST /users/login`
- Logout: `DELETE /users/logout`
- Info usuario: `GET /users/info`

### Posts
- Crear: `POST /posts`
- Obtener todos: `GET /posts`
- Buscar por título: `GET /posts/title/:title`
- Buscar por ID: `GET /posts/id/:id`
- Paginación: `GET /posts/paginated?page=1&limit=10`
- Like/Unlike: `PUT /posts/like/:id`, `PUT /posts/unlike/:id`
- Editar: `PUT /posts/:id` (requiere ser autor)
- Eliminar: `DELETE /posts/:id` (requiere ser autor)

### Comentarios
- Crear comentario: `POST /comments/:postId`

---

## 🔐 Autenticación
- JWT se genera al hacer login y se guarda como token.
- Middleware `authentication` para rutas protegidas.
- Middleware `isAuthor` para verificar autoría de un post.

---

## 🌍 Enlace en producción

👉 [https://twodo-proyecto-backend.onrender.com](https://twodo-proyecto-backend.onrender.com)

---

## 📦 Comandos importantes

```bash
npm init -y
npm install express mongoose dotenv bcrypt jsonwebtoken
npm install --save-dev nodemon
```

---

## 📁 .gitignore optimizado

Incluye:
- `node_modules/`
- `.env` y derivados
- logs, editor config, archivos del sistema como `.DS_Store`

---

## 🙋 Autora

**Elida Rodriguez**  
Bootcamp Desarrollo Web Fullstack  
The Bridge


