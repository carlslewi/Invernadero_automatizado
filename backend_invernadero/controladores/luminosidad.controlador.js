const db = require("../modelos");

const Luminosidad = db.luminosidad;

//Introducir temperatura en bd

exports.create = (req, res)=>{
    if(!req.body.valor){
        res.status(400).send({mensaje:"No se ha recibido ningun valor"});
        return;
    }

    const luminosidad = {
        valor : req.body.valor
    };

    Luminosidad.create(luminosidad).then(datos => {res.send(datos);})
    .catch(err => {res.status(500).send({mensaje:err.mensaje || "Error guardando temperatura en base de datos"});});
};

//Devolver todos los valores de temperaturas registrados en la base de datos

exports.findAll = (req,res) => {
    Luminosidad.findAll({}).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
};