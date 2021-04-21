module.exports = (sequelize, Sequelize)=>{
    const Usuario = sequelize.define("usuarios",{
        nom_usuario : {
            type: Sequelize.STRING
        },
        password : {
            type: Sequelize.STRING
        },
        email:{
            type : Sequelize.STRING
        },
        activo : {
            type : Sequelize.BOOLEAN
        }
    });
    return Usuario;
};
