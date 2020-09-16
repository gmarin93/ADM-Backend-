const mongoose=require('mongoose');
const UsuariosSchema=mongoose.Schema({

    nombre:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    registro:{
        type:Date,
        default:Date.now()
    }

});

//trim permite eliminar los espacios en blanco cuano se inserta un dato.
//Unique valida correo, solo una vez.

module.exports=mongoose.model('Usuario', UsuariosSchema);