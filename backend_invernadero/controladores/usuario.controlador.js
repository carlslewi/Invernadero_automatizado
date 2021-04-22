const db = require("../modelos");
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

exports.accesoPublico = (req,res) => {
    res.status(200).send("Contenido publico");
};

exports.accesoUsuario = (req,res) => {
    res.status(200).send("Contenido usuario");
};

exports.accesoAdministrador = (req,res) => {
    res.status(200).send("Contenido administrador");
};

exports.findAll = (req,res) => {
  const nom_usuario = req.query.nom_usuario;
  var condition = nom_usuario ? { nom_usuario: { [Op.like]: `%${nom_usuario}%` } } : null;

  Usuario.findAll({ where: condition })
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

exports.update = (req, res) => {
  const id = req.params.id;

  Usuario.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuario actualizado correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar usuario con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando usuario con id=" + id
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error devolviendo usuario con id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Usuario.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuario borrado correctamente"
        });
      } else {
        res.send({
          message: `No se puede borrar usuario con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al borrar usuario con id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Usuario.destroy({
    where: {id:{[Op.not]:'1'}},
    truncate: false
  })
    .then(veces=> {
      res.send({ message: `${veces} usuarios borrados` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al borrar todos los usuarios."
      });
    });
};

exports.findInactivos = (req,res) => {
  Usuario.findAll({ where: {activo:false} })
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

exports.findActivos = (req,res) => {
  Usuario.findAll({ where: {activo:true} })
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