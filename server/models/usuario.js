const mongoose = require('mongoose');

// paquete para valores definidos como unique
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

// se define esto y se usa en enum en el campo role
let rolesValidos = {
    values: ['USER_ROLE', 'SUPER_ROLE'],
    message: '{VALUE} no es un role valido'
};

// para crear una nueva tabla
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contrasena es necesaria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject
};

// Da formato al mensaje de error para mail unique
mongoose.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Usuarios', usuarioSchema);