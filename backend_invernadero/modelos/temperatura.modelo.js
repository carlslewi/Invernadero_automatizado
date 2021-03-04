const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize) => {
    const Temperatura = sequelize.define("temperatura",{
        valor : {
            type: Sequelize.FLOAT
        },
        fecha : {
            type: Sequelize.DATE
        }
    });
return Temperatura;
};