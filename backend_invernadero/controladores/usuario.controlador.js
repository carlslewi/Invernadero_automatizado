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
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
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
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};