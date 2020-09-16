const Usuario=require('../models/Usuario');
const bcryptjs=require('bcryptjs'); //Permite hashear los passwords
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');


exports.autenticarUsuario= async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errores:errors.array()});
    }

    const {email,password}=req.body;

    try {
        
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        const passCorrecto = await bcryptjs.compare(password, usuario.password);

        if(!passCorrecto){
            return res.status(400).json({msg: 'Password Incorrecto'});
        }


        const payload={

            usuario:{
                id:usuario.id
            }
        };

        //Se firma el token
        jwt.sign(payload,process.env.SECRETA,{

            expiresIn:3600 //1 hora

        },(error,token)=>{
            if(error) throw error;

            res.json({token});
        });

    } catch (error) {
        
       console.log(error); 

    }
}

exports.usuarioAutenticado = async (req,res) => {

    try {
        
        const usuario= await Usuario.findById(req.usuario.id).select('-password'); //Indica que todos los elementos menos el password
        res.json({usuario});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}