const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
    codigo: String,
    nombre: String,
    creditos: Number
});

module.exports = mongoose.model('Curso', CursoSchema);
