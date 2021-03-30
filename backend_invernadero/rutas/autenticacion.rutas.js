const {verificarRegistro} = require("../verificacion");
const controlador = require("../controladores/autenticacion.controlador");

module.exports = function(serv){
    serv.use(function(req,res,next){
        res.header(
           "Access-Control-Allow-Headers",
           "x-access-token, Origin, Content-Type, Accept" 
        );
        next();
    });
serv.post("/api/auth/registro",
[verificarRegistro.comprobarUsuarioOEmail, verificarRegistro.comprobarRol],controlador.registro);
serv.post("/api/auth/login", controlador.login);
};
