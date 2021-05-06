const db = require("../modelos");
const Humedad = db.humedad;
const Op = db.Sequelize.Op;
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
//Devolver media de temperaturas entre horas
exports.findFechas = (req,res) => {
  const fechap = req.query.fechap;
  const fechaf = req.query.fechaf;
  var condition = fechap && fechaf ? { createdAt: { [Op.between]: [fechap,fechaf] } } : null;
  Humedad.findAll({
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

exports.findLastHum = (req,res) => {
    Humedad.findAll({
    limit:1,
    order: [
      ['id','DESC']    
    ]
  }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findHumDiaMax = (req,res) => {
  const fechap = req.query.fechap;
  const fechaf = req.query.fechaf;
  var condition = fechap && fechaf ? { createdAt: { [Op.between]: [fechap,fechaf] } } : null;
  Humedad.findAll({
    limit:1,
    order: [['valor','DESC']],
    where:condition
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findHumDiaMin = (req,res) => {
  const fechap = req.query.fechap;
  const fechaf = req.query.fechaf;
  var condition = fechap && fechaf ? { createdAt: { [Op.between]: [fechap,fechaf] } } : null;
  Humedad.findAll({
    limit:1,
    order: [['valor']],
    where:condition
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findHumMax = (req,res) => {
    Humedad.findAll({
    limit:1,  
    order:[['valor','DESC']],
    group:'valor'
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findHumMin = (req,res) => {
    Humedad.findAll({
    limit:1,  
    order:[['valor']],
    group:'valor'
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.deleteAll = (req, res) => {
    Humedad.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Humedades borradas` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha ocurrido algún error"
        });
      });
  };

  exports.findHums = (req,res) => {
    Humedad.findAll({  
      attributes: ['createdAt',[db.sequelize.fn('AVG', db.sequelize.col('valor')), 'average']],
      group: [[db.sequelize.fn('hour', db.sequelize.col('createdAt'))], [db.sequelize.fn('day', db.sequelize.col('createdAt'))]],  
      order:['createdAt']
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
    
  };