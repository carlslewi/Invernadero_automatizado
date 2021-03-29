module.exports = (sequelize,Sequelize) => {
    const Luminosidad = sequelize.define("luminosidad",{
        valor : {
            type: Sequelize.FLOAT
        }
        /*fecha : {
            type: Sequelize.DATE
        }*/
    });
return Luminosidad;
};