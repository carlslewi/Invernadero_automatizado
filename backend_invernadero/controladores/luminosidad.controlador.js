const db = require("../modelos");
const Luminosidad = db.luminosidad;
const Op = db.Sequelize.Op;

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

exports.findAll = (req,res) => {
    Luminosidad.findAll({}).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
};

exports.findFechas = (req,res) => {
  const fechap = req.query.fechap;
  const fechaf = req.query.fechaf;
  var condition = fechap && fechaf ? { createdAt: { [Op.between]: [fechap,fechaf] } } : null;
  Luminosidad.findAll({
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

exports.findLastLum = (req,res) => {
    Luminosidad.findAll({
    limit:1,
    order: [
      ['id','DESC']    
    ]
  }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findLumDiaMax = (req,res) => {
  const fechap = req.query.fechap;
  const fechaf = req.query.fechaf;
  var condition = fechap && fechaf ? { createdAt: { [Op.between]: [fechap,fechaf] } } : null;
  Luminosidad.findAll({
    limit:1,
    order: [['valor','DESC']],
    where:condition
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findLumDiaMin = (req,res) => {
  const fechap = req.query.fechap;
  const fechaf = req.query.fechaf;
  var condition = fechap && fechaf ? { createdAt: { [Op.between]: [fechap,fechaf] } } : null;
  Luminosidad.findAll({
    limit:1,
    order: [['valor']],
    where:condition
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findLumMax = (req,res) => {
    Luminosidad.findAll({
    limit:1,  
    order:[['valor','DESC']],
    group:'valor'
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.findLumMin = (req,res) => {
    Luminosidad.findAll({
    limit:1,  
    order:[['valor']],
    group:'valor'
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
  
};

exports.deleteAll = (req, res) => {
    Luminosidad.destroy({
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

  exports.findLums = (req,res) => {
    Luminosidad.findAll({  
      attributes: ['createdAt',[db.sequelize.fn('AVG', db.sequelize.col('valor')), 'average']],
      group: [[db.sequelize.fn('hour', db.sequelize.col('createdAt'))], [db.sequelize.fn('day', db.sequelize.col('createdAt'))]],  
      order:['createdAt']
    }).then(datos => {res.send(datos);}).catch(err => {res.status(500).send({mensaje:err.mensaje || "Error al mostrar datos"});});
    
  };