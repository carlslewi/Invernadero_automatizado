module.exports = (sequelize,Sequelize) => {
    const Humedad = sequelize.define("humedad",{
        valor : {
            type: Sequelize.FLOAT
        }
        /*fecha : {
            type: Sequelize.DATE
        }*/
    });
return Humedad;
};