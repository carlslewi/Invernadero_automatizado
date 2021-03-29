module.exports = (sequelize, Sequelize)=>{
    const Rol = sequelize.define("roles",{
        id : {
            type : Sequelize.Integer,
            primaryKey: true
        },
        rol : {
            type: Sequelize.STRING
        }
    });
    return Rol;
};
