const db = require("../modelos");

const Humedad = db.humedad;

//Introducir temperatura en bd

exports.create = (req, res)=>{
    if(!req.body.valor){
        res.status(400).send({mensaje:"No se ha recibido ningun valor"});
        return;
    }

    const humedad = {
        valor : req.body.valor
    };

    Humedad.create(humedad).then(datos => {res.send(datos);})
    .catch(err => {res.status(500).send({mensaje:err.mensaje || "Error guardando temperatura en base de datos"});});
};

//Devolver todos los valores de temperaturas registrados en la base de datos

exports.findAll = (req,res) => {
    Humedad.findAll({}).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
};