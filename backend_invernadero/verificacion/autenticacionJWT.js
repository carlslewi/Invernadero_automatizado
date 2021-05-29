const jwt = require("jsonwebtoken");
const configautenticacion = require("../configdb/configautenticacion");
const db = require("../modelos") 
const Usuario = db.usuario;

verificarToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
        res.status(403).send({message:"No se ha proporcionado token"});
    }
    jwt.verify(token,configautenticacion.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({message:"Rechazado"});
        }
        req.id_usuario = decoded.id;
        next();
    });
};

esAdministrador = (req,res,next)=>{
    Usuario.findByPk(req.id_usuario).then(usuario=>{
        usuario.getRoles().then(roles => {
            for(let i=0; i<roles.length;++i){
                if(roles[i].rol=="administrador"){
                    next();
                    return;
                }
            }
            res.status(403).send({message:"Necesario ser administrador"});
            return;
        });
    });
};

const authJWT = {
    verificarToken:verificarToken,
    esAdministrador:esAdministrador
};

module.exports = authJWT;