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
const run = async()=>{Rol.create({id:1, rol:"usuario"});
const r= await Rol.create({id:2, rol:"administrador"})
const u= await Usuario.create({id:1,nom_usuario:"admin",password:"admin",email:"admin@uca.es"});
await u.addRoles([r])}

//Lamaremos a sync, esto creara las tablas y modificaciones en la bd

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    run();
  });

//db.sequelize.sync();

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
