const Proyecto= require('../models/Proyecto');
const {validationResult} = require('express-validator');


exports.crearProyecto = async (req,res) =>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errores:errors.array()});
    }

    try {
        
        const proyecto=new Proyecto(req.body);

        proyecto.creador=req.usuario.id;
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurre un problema');
    }
}

exports.obtenerProyectos=async(req,res)=>{

    try {
       
        const proyectos= await Proyecto.find({creador: req.usuario.id}).sort({creador:-1});
        res.json({proyectos});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarProyecto=async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errores:errors.array()});
    }

    const {nombre}=req.body;
    const nuevoproyecto={};

    if(nombre){
        nuevoproyecto.nombre=nombre;
    }

    try {

        let proyecto=await Proyecto.findById(req.params.id);

        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }

        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: `No autorizado`});
        }

        proyecto= await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoproyecto},{new:true});

        return res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error en el servidor`);
    }
    
}

exports.eliminarProyecto= async (req,res) => {

    try {
        
        let proyecto=await Proyecto.findById(req.params.id);
    
        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'})
        }
    
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: `No autorizado`});
        }

        await Proyecto.findOneAndRemove({_id: req.params.id});

        res.json({msg: `Proyecto Eliminado`});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }    
}