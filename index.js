require('dotenv').config(); // Carga las variables de entorno desde .env
const express = require('express');
const connectDB = require('./database'); // Importa la conexión a MongoDB
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Instala esta librería con `npm install jsonwebtoken`
const User = require('./models/User'); // Modelo de usuario
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Permite parsear JSON en las solicitudes
app.use(cors()); // Habilita CORS para permitir solicitudes del frontend

// Conectar a MongoDB
connectDB();

// Definir esquemas y modelos para las colecciones
const taskNewSchema = new mongoose.Schema({
    user_id: String,
    task_name: String,
    description: String,
    due_date: Date,
    created_at: { type: Date, default: Date.now }
});
const TaskNew = mongoose.model('TaskNew', taskNewSchema, 'tasks_new');

const taskCompletedSchema = new mongoose.Schema({
    user_id: String,
    task_name: String,
    completion_date: { type: Date, default: Date.now }
});
const TaskCompleted = mongoose.model('TaskCompleted', taskCompletedSchema, 'tasks_completed');

const recycleBinSchema = new mongoose.Schema({
    user_id: String,
    task_name: String,
    deleted_at: { type: Date, default: Date.now }
});
const RecycleBin = mongoose.model('RecycleBin', recycleBinSchema, 'papelera');

const taskEditedSchema = new mongoose.Schema({
    user_id: String,
    task_id: String,
    previous_task_name: String,
    new_task_name: String,
    edited_at: { type: Date, default: Date.now }
});
const TaskEdited = mongoose.model('TaskEdited', taskEditedSchema, 'tasks_edited');

const notificationSchema = new mongoose.Schema({
    user_id: String,
    email_notifications: Boolean,
    sms_notifications: Boolean,
    reminder_time: String
});
const Notification = mongoose.model('Notification', notificationSchema, 'notifications');


// Ruta de registro
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validación de campos
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Validar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
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
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
});

// Ruta para agregar una nueva tarea (tasks_new)
app.post('/api/tasks/new', async (req, res) => {
    try {
        const { user_id, task_name, description, due_date } = req.body;
        const newTask = new TaskNew({
            user_id,
            task_name,
            description,
            due_date
        });
        await newTask.save();
        res.status(201).json({ message: 'Tarea agregada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar la tarea', error: error.message });
    }
});

// Ruta para completar una tarea (tasks_completed)
app.post('/api/tasks/complete', async (req, res) => {
    try {
        const { task_id, user_id, task_name } = req.body;

        // Validar datos de entrada
        if (!task_id || !user_id || !task_name) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Convertir task_id a ObjectId
        const taskObjectId = mongoose.Types.ObjectId(task_id);

        // Buscar la tarea en tasks_new
        const task = await TaskNew.findById(taskObjectId);
        if (!task) {
            return res.status(404).json({ message: 'La tarea no fue encontrada en tasks_new' });
        }

        console.log('Tarea encontrada en tasks_new:', task);

        // Crear la tarea en tasks_completed
        const completedTask = new TaskCompleted({
            user_id: task.user_id,
            task_name: task.task_name,
            completion_date: new Date()
        });
        await completedTask.save();

        // Eliminar la tarea de tasks_new
        const deletedTask = await TaskNew.findByIdAndDelete(taskObjectId);
        console.log('Tarea eliminada de tasks_new:', deletedTask);

        res.status(200).json({ message: 'Tarea marcada como completada' });
    } catch (error) {
        console.error('Error al completar la tarea:', error);
        res.status(500).json({ message: 'Error al completar la tarea', error: error.message });
    }
});

// Ruta para eliminar una tarea (papelera)
app.post('/api/tasks/delete', async (req, res) => {
    try {
        const { task_id, user_id, task_name } = req.body;

        // Validar datos de entrada
        if (!task_id || !user_id || !task_name) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Convertir task_id a ObjectId
        const taskObjectId = mongoose.Types.ObjectId(task_id);

        // Buscar la tarea en tasks_new
        const task = await TaskNew.findById(taskObjectId);
        if (!task) {
            return res.status(404).json({ message: 'La tarea no fue encontrada en tasks_new' });
        }

        // Mover la tarea a la papelera
        const deletedTask = new RecycleBin({
            user_id: task.user_id,
            task_name: task.task_name,
            deleted_at: new Date()
        });
        await deletedTask.save();

        // Eliminar la tarea de tasks_new
        await TaskNew.findByIdAndDelete(taskObjectId);

        res.status(200).json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ message: 'Error al eliminar la tarea', error: error.message });
    }
});

// Ruta para editar una tarea (tasks_edited)
app.post('/api/tasks/edit', async (req, res) => {
    try {
        const { task_id, user_id, previous_task_name, new_task_name } = req.body;
        const editedTask = new TaskEdited({
            user_id,
            task_id,
            previous_task_name,
            new_task_name
        });
        await editedTask.save();
        res.status(200).json({ message: 'Tarea editada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al editar la tarea', error: error.message });
    }
});

// Ruta para configurar notificaciones
app.post('/api/notifications', async (req, res) => {
    try {
        const { user_id, email_notifications, sms_notifications, reminder_time } = req.body;
        const notification = new Notification({
            user_id,
            email_notifications,
            sms_notifications,
            reminder_time
        });
        await notification.save();
        res.status(201).json({ message: 'Notificaciones configuradas correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al configurar notificaciones', error: error.message });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
