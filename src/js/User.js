
const mongoose = require('mongoose')

const Users = mongoose.model('User',{
    dni:{type: Number, required: true, minLength:7},
    nombre: {type: String, required:true, minLength:3},
    apellido: {type: String, required:true, minLength:3},
    sexo: {type: String, required:true},
    numeroTelefono: {type:Number, required:true}
})


module.exports = Users