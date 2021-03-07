const dbconf = require("../configdb/configdb");
const Sequelize = require("sequelize");
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
module.exports = db;