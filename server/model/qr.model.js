const mongoose = require('mongoose');

const QrSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "El Token es requerido"]

    },
    lectorId: {
        type: String,
        required: [true, "Id del Guarda es requerido"]

    },
}, { timestamps: true });


module.exports.Qr = mongoose.model('qr', QrSchema);


