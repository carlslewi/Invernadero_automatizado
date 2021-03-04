const express = require("express");
const cors = require("cors");

const serv = express();

//Aqui definiremos las opciones de cors

var opCors = {
    origin:"http://localhost:8081"
};

serv.use(cors(opCors));

//Annadiremos los metodos json y urlencoded para acceder facilmente al contenido 
//de las peticiones HTTP que están en formato json

serv.use(express.json());
serv.use(express.urlencoded({ extended: true }));

//Lamaremos a sync

const db = require("./modelos");
db.sequelize.sync();

//Definiremos una ruta simple para cuando nos conectemos al servidor nos muestre um mensaje de bienvenida

serv.get("/",(req, res) => {res.json({mensaje:"Bienvenido a servidor Backend de la aplicacion"})});

//Configuramos el puerto por el que van a ser escuchadas las peticiones

const PORT = process.env.PORT || 8080;

serv.listen(PORT,() => {console.log(`Servidor escuchando en puerto ${PORT}.`);});