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
    serv.get("/api/test/usuarios", controlador.findAll);
    serv.put("/api/test/usuarios/:id", controlador.update);
    serv.get("/api/test/usuarios/:id", controlador.findOne);
    serv.delete("/api/test/usuarios/:id", controlador.delete);
    serv.delete("/api/test/usuarios", controlador.deleteAll);
    serv.get("/api/test/usuarios_inactivos", controlador.findInactivos);
    serv.get("/api/test/usuarios_activos", controlador.findActivos);
};