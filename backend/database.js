const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/academico',)
    
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error(err));
