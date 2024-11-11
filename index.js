require('dotenv').config();  // Carga las variables de entorno desde .env
const express = require('express');
const connectDB = require('./database');  // Importa la conexión a MongoDB

const app = express();
app.use(express.json());  // Permite parsear JSON en las solicitudes

connectDB();  // Conecta a MongoDB

// Aquí puedes agregar las rutas para los botones de inicio de sesión, registro y recuperación de contraseña
app.listen(3000, () => console.log('Servidor iniciado en http://localhost:3000'));

