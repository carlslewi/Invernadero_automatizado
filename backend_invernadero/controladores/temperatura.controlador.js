const db = requiere("../modelos");

const Temperatura = db.temperatura;

//Introducir temperatura en bd

exports.create = (req, res)=>{
    if(!req.body.valor){
        res.status(400).send({mensaje:"No se ha recibido ningun valor"});
        return;
    }

    const temperatura = {
        valor : req.body.temperatura,
        fecha : req.body.fecha
    };

    Temperatura.create(temperatura).then(datos => {res.send(datos);})
    .catch(err => {res.status(500).send({mensaje:err.mensaje || "Error guardando temperatura en base de datos"});});
};