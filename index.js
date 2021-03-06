const express=require("express");
const conectarDB=require('./config/db');
const cors = require('cors');

const app=express();

conectarDB();

app.use(cors());

//Habilitar express.json para interpretar las entradas de request. Header application/json
app.use(express.json({extended:true}));

const port=process.env.port || 5000; //Cualquier numero que no sea 3000

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));

// app.get('/',(req,res)=>{
//     res.send("Hoklnrlcla");
// })

app.listen(port, '0.0.0.0',()=>{
    console.log(`El servidor estar funcionando correctamente en el puerto: ${port}`);
})

