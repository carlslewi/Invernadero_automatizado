const db = require("../modelos");
var moment = require("moment")
const Temperatura = db.temperaturas;
const Op = db.Sequelize.Op;
//Introducir temperatura en bd

exports.create = (req, res)=>{
    if(!req.body.valor){
        res.status(400).send({mensaje:"No se ha recibido ningun valor"});
        return;
    }

    const temperatura = {
        valor : req.body.valor
    };

    Temperatura.create(temperatura).then(datos => {res.send(datos);})
    .catch(err => {res.status(500).send({mensaje:err.mensaje || "Error guardando temperatura en base de datos"});});
};

//Devolver todos los valores de temperaturas registrados en la base de datos
/*
exports.findAll = (req,res) => {
    Temperatura.findAll({}).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
};*/

exports.findAll = (req,res) => {
  const fechap = req.query.fechap;
  const fechaf = req.query.fechaf;
  var condition = fechap && fechaf ? { createdAt: { [Op.between]: [fechap,fechaf] } } : null;
  Temperatura.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha ocurrido algun error."
      });
    });
};

//Devolver ultima temperatura insertada

exports.findLastTemp = (req,res) => {
  Temperatura.findAll({
    attributes: [
      [db.sequelize.fn('MAX', db.sequelize.col('id')), 'idmax'],
      'valor'
    ]
  }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});;
};

exports.deleteAll = (req, res) => {
    Temperatura.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Temperaturas borradas` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha ocurrido algún error"
        });
      });
  };