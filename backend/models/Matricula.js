const mongoose = require('mongoose');

const MatriculaSchema = new mongoose.Schema({
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: true
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Matricula', MatriculaSchema);
