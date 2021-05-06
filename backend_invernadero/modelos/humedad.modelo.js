module.exports = (sequelize,Sequelize) => {
    const Humedad = sequelize.define("humedad",{
        valor : {
            type: Sequelize.FLOAT
        }
    });
return Humedad;
};