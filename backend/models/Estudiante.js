const mongoose = require('mongoose');

const EstudianteSchema = new mongoose.Schema({
    cedula: String,
    nombre: String,
    apellido: String,
    correo: String
});

module.exports = mongoose.model('Estudiante', EstudianteSchema);
