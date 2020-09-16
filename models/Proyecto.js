const mongoose=require('mongoose');
const ProyectoSchema=mongoose.Schema({

    nombre:{
        type:String,
        required:true,
        trim:true
    },
    creador:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
    },
    creado:{
        type:Date,
        default:Date.now()
    }

});

//trim permite eliminar los espacios en blanco cuano se inserta un dato.
//Unique valida correo, solo una vez.

module.exports=mongoose.model('Proyecto', ProyectoSchema);