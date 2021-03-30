module.exports = (sequelize, Sequelize)=>{
    const Rol = sequelize.define("roles",{
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        rol : {
            type: Sequelize.STRING
        }
    });
    return Rol;
};
