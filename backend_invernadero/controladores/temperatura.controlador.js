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

exports.findAll = (req,res) => {
    Temperatura.findAll({}).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
};
//Devolver media de temperaturas entre horas
exports.findFechas = (req,res) => {
  const fechap = req.query.fechap;
  const fechaf = req.query.fechaf;
  var condition = fechap && fechaf ? { createdAt: { [Op.between]: [fechap,fechaf] } } : null;
  Temperatura.findAll({
    attributes: ['createdAt',[db.sequelize.fn('AVG', db.sequelize.col('valor')), 'average']],
    where: condition,
    group: [[db.sequelize.fn('hour', db.sequelize.col('createdAt'))], [db.sequelize.fn('day', db.sequelize.col('createdAt'))]],  
    order:['createdAt'] 
  })
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
    limit:1,
    order: [
      ['id','DESC']    
    ]
  }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findTempDiaMax = (req,res) => {
  const fechap = req.query.fechap;
  const fechaf = req.query.fechaf;
  var condition = fechap && fechaf ? { createdAt: { [Op.between]: [fechap,fechaf] } } : null;
  Temperatura.findAll({
    limit:1,
    order: [['valor','DESC']],
    where:condition
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findTempDiaMin = (req,res) => {
  const fechap = req.query.fechap;
  const fechaf = req.query.fechaf;
  var condition = fechap && fechaf ? { createdAt: { [Op.between]: [fechap,fechaf] } } : null;
  Temperatura.findAll({
    limit:1,
    order: [['valor']],
    where:condition
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findTempMax = (req,res) => {
  Temperatura.findAll({
    limit:1,  
    order:[['valor','DESC']],
    group:'valor'
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findTempMin = (req,res) => {
  Temperatura.findAll({
    limit:1,  
    order:[['valor']],
    group:'valor'
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
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

  exports.findTemps = (req,res) => {
    Temperatura.findAll({  
      attributes: ['createdAt',[db.sequelize.fn('AVG', db.sequelize.col('valor')), 'average']],
      group: [[db.sequelize.fn('hour', db.sequelize.col('createdAt'))], [db.sequelize.fn('day', db.sequelize.col('createdAt'))]],  
      order:['createdAt']
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
    
  };