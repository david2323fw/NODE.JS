// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { authenticateJWT } = require('./middlewares/authMiddleware');
const dbConnect = require('./db'); // Nueva estructura

dotenv.config();

const app = express();

// Conectar a la base de datos
dbConnect();

// Middleware
app.use(express.json());  // Para parsear JSON
app.use(cors());          // Habilitar CORS para que el frontend pueda comunicarse

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));  // Permitir acceso a la carpeta public

// Rutas de usuarios (registro y login)
app.use('/users', userRoutes);

// Rutas para productos, con autenticación
app.use('/productos', authenticateJWT, productRoutes);  // Gestión de productos (requiere token)

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
