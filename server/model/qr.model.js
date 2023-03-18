const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QrSchema = new mongoose.Schema({
    generadorID: {
        type: Schema.ObjectId, ref: 'user',
        required: [true, "Id del Universitario es requerido"]

    },
    lectorId: {
        type: Schema.ObjectId, ref: 'user',
        required: [true, "Id del Guarda es requerido"]
    },
}, { timestamps: true });


module.exports.Qr = mongoose.model('qr', QrSchema);


