const {authJWT} = require("../verificacion");
const controlador = require("../controladores/usuario.controlador");

module.exports = function(serv){
    serv.use(function(req,res,next){
        res.header(
           "Access-Control-Allow-Headers",
           "x-access-token, Origin, Content-Type, Accept" 
        );
        next();
    });
    serv.get("/api/test/all", controlador.accesoPublico);
    serv.get("/api/test/usuario", [authJWT.verificarToken], controlador.accesoUsuario);
    serv.get("/api/test/administrador", [authJWT.verificarToken], controlador.accesoAdministrador);
};