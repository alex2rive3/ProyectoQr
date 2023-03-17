const mongoose = require('mongoose');

const pruebaSchema = new mongoose.Schema({
    generadorID: {
        rutalumno: { type: Schema.ObjectId, ref: 'user' },
        required: [true, "El Token es requerido"]

    },
    lectorId: {
        codigocurso: { type: Schema.ObjectId, ref: 'user' },
        required: [true, "Id del Guarda es requerido"]
    },
}, { timestamps: true });


module.exports.Prueba = mongoose.model('Prueba', pruebaSchema);


