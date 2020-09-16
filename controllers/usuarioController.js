const Usuario=require('../models/Usuario');
const bcryptjs=require('bcryptjs'); //Permite hashear los passwords
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');

exports.crearUsuario=async (req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errores:errors.array()});
    }

    const {email,password}=req.body;
    
    try {
        
        let usuario= await Usuario.findOne({email}); //Encuentra un registro igual con ese valor

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya exite'});
        }

        usuario= new Usuario(req.body);

        const salt= await bcryptjs.genSalt(10);
        usuario.password=await bcryptjs.hash(password,salt); //Se ingresa la instancia de salt y contrasena a hashear

        await usuario.save();

        const payload={

            usuario:{
                id:usuario.id
            }
        };

        jwt.sign(payload,process.env.SECRETA,{

            expiresIn:3600 //1 hora

        },(error,token)=>{
            if(error) throw error;

            res.json({token});
        });

        // res.json({msg:'Usuario creado correctamente'});

    } catch (error) {
        console.log(error);
        res.status=error(400).send('Error al insertar');
    }
}