const dbconf = require("../configdb/configdb");
const Sequelize = require("sequelize");
const { BelongsToMany } = require("sequelize");
const sequelize = new Sequelize(dbconf.DB, dbconf.USER, dbconf.PASSWORD, {
    host : dbconf.HOST,
    dialect : dbconf.dialect,

    pool: {
        max : dbconf.pool.max,
        min : dbconf.pool.min,
        acquire : dbconf.pool.acquire,
        idle: dbconf.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.temperaturas = require("./temperatura.modelo")(sequelize,Sequelize);
db.humedad = require("./humedad.modelo")(sequelize, Sequelize);
db.luminosidad = require("./luminosidad.modelo")(sequelize, Sequelize);
db.usuario = require("./usuario.modelo")(sequelize, Sequelize);
db.rol = require("./rol.modelo")(sequelize, Sequelize);

//Implementamos las relaciones entre tablas

//Las relaciones entre usuarios y roles seran muchos a muchos

db.usuario.belongsToMany(db.rol,{
    through:"usuario_rol",
    foreignKey:"id_usuario",
    otherKey:"id_rol"
});

db.rol.belongsToMany(db.usuario,{
    through:"usuario_rol",
    foreignKey:"id_rol",
    otherKey:"id_usuario"
});

db.ROLES = ["usuario","administrador"];
module.exports = db;