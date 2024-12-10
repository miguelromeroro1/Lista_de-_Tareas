require('dotenv').config(); // Carga las variables de entorno desde .env
const express = require('express');
const connectDB = require('./database'); // Importa la conexión a MongoDB
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Instala esta librería con `npm install jsonwebtoken`
const User = require('./models/User'); // Modelo de usuario

const app = express();
app.use(express.json()); // Permite parsear JSON en las solicitudes
app.use(cors()); // Habilita CORS para permitir solicitudes del frontend

// Conectar a MongoDB
connectDB();

// Ruta de registro
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validación de campos
        if (!name || !email || !password) {
            console.log('Faltan campos obligatorios');
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        console.log('Datos recibidos:', { name, email });

        // Validar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('El usuario ya está registrado:', email);
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        console.log('Usuario registrado con éxito:', { name, email });
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// Ruta de inicio de sesión
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor iniciado en http://localhost:${PORT}`));


