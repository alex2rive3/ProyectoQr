const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    permit: {
        type: String,
        require: [true, "Es obligatorio otorgar permiso al usuario"],
        enum: ["universitario", "guarda", "administrador"]
    }
}, { timestamps: true });

// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);


UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// this should go after 
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});
//encriptar la contraseña al modif
UserSchema.pre('findOneAndUpdate', function (next) {
    console.log("actualizar :", this._update.password)
    bcrypt.hash(this._update.password, 10)
        .then(hash => {
            this._update.password = hash;
            next();
        });
});

module.exports.User = mongoose.model('user', UserSchema);


