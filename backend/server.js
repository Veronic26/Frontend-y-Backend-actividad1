const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Conexión MongoDB (VERSIÓN NUEVA)
mongoose.connect('mongodb://127.0.0.1:27017/academico')
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log(err));

// Rutas
app.use('/api/estudiantes', require('./routes/estudiantes.routes'));
app.use('/api/cursos', require('./routes/cursos.routes'));
app.use('/api/matriculas', require('./routes/matriculas.routes'));

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});