const express = require("express");
const cors = require("cors");
const serv = express();
const db = require("./modelos");
const U_controlador = require("./controladores/usuario.controlador");

//Aqui definiremos las opciones de cors

var opCors = {
    origin:"http://localhost:8081"
};

serv.use(cors(opCors));

//Annadiremos los metodos json y urlencoded para acceder facilmente al contenido 
//de las peticiones HTTP que están en formato json

serv.use(express.json());
serv.use(express.urlencoded({ extended: true }));

/*Crearemos los roles mientras estemos desarrollando la aplicacion mediante la funcion
inicializar(), una vez acabada la borraremos y los crearemos manualmente*/

const Rol = db.rol;
const Usuario = db.usuario;
//Preparamos la base de datos
const run = async()=>{
const r0= await Rol.create({id:1, rol:"usuario"});
const r1= await Rol.create({id:2, rol:"administrador"})
const u1= await Usuario.create({id:1,nom_usuario:"admin",password:"$2a$08$uA1rNlXHAGkrZfqefNl7.ubtYwBp5XWj4eKRNsoArzgs2cJcjU/Tq",email:"admin@uca.es", activo:true});
const u2= await Usuario.create({id:2,nom_usuario:"baldu",password:"$2a$08$uA1rNlXHAGkrZfqefNl7.ubtYwBp5XWj4eKRNsoArzgs2cJcjU/Tq",email:"admn@uca.es", activo:false});
const u3= await Usuario.create({id:3,nom_usuario:"dimak",password:"$2a$08$uA1rNlXHAGkrZfqefNl7.ubtYwBp5XWj4eKRNsoArzgs2cJcjU/Tq",email:"adm@uca.es", activo:false});
const u4= await Usuario.create({id:4,nom_usuario:"tamper",password:"$2a$08$uA1rNlXHAGkrZfqefNl7.ubtYwBp5XWj4eKRNsoArzgs2cJcjU/Tq",email:"ad@uca.es", activo:false});
const u5= await Usuario.create({id:5,nom_usuario:"kjñl",password:"$2a$08$uA1rNlXHAGkrZfqefNl7.ubtYwBp5XWj4eKRNsoArzgs2cJcjU/Tq",email:"a@uca.es", activo:false});
const u6= await Usuario.create({id:6,nom_usuario:"tmper",password:"$2a$08$uA1rNlXHAGkrZfqefNl7.ubtYwBp5XWj4eKRNsoArzgs2cJcjU/Tq",email:"as@uca.es", activo:false});
const u7= await Usuario.create({id:7,nom_usuario:"tsfsfper",password:"$2a$08$uA1rNlXHAGkrZfqefNl7.ubtYwBp5XWj4eKRNsoArzgs2cJcjU/Tq",email:"addds@uca.es", activo:false});
const u8= await Usuario.create({id:8,nom_usuario:"tsfsssfsfper",password:"$2a$08$uA1rNlXHAGkrZfqefNl7.ubtYwBp5XWj4eKRNsoArzgs2cJcjU/Tq",email:"adfgddds@uca.es", activo:false});
const u9= await Usuario.create({id:9,nom_usuario:"tsfsssfdgdgfsfper",password:"$2a$08$uA1rNlXHAGkrZfqefNl7.ubtYwBp5XWj4eKRNsoArzgs2cJcjU/Tq",email:"adfgdfhdddds@uca.es", activo:false});
await u1.addRoles([r1])
await u2.addRoles([r0])
await u3.addRoles([r0])
await u4.addRoles([r0])
await u5.addRoles([r0])
await u6.addRoles([r0])
await u7.addRoles([r0])
await u8.addRoles([r0])
await u9.addRoles([r0])
}

//Lamaremos a sync, esto creara las tablas y modificaciones en la bd

/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    run();
  });*/

db.sequelize.sync();

//Definiremos una ruta simple para cuando nos conectemos al servidor nos muestre um mensaje de bienvenida

serv.get("/",(req, res) => {res.json({mensaje:"Bienvenido a servidor Backend de la aplicacion"});
});

//requerimos las rutas

require("./rutas/rutas")(serv);
require("./rutas/autenticacion.rutas")(serv);
require("./rutas/usuario.rutas")(serv);


//Configuramos el puerto por el que van a ser escuchadas las peticiones

const PORT = process.env.PORT || 8080;

serv.listen(PORT,() => {console.log(`Servidor escuchando en puerto ${PORT}.`);});

//Requerimos a cliente.js para suscribirnos a los sensores
require("./cliente/cliente");
