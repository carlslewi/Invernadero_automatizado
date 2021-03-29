const db = require("../modelos");
const Roles = db.ROLES;
const Usuario = db.usuario;

comprobarUsuarioOEmail = (req, res, next)=>{
    Usuario.findOne({where:{nom_usuario:req.body.nom_usuario}}).
    then(usuario => {
        if(usuario){
            res.status(400).send(
                {message:"Error, usuario ya registrado"
             });
             return;
        }
    Usuario.findOne({where : {email:req.body.email}}).then(usuario => {
        if(usuario){
            res.status(400).send(
                {message:"Error, email ya registrado"
             });
             return;
        }
        next();
    });
    });
};

comprobarRol = (req,res,next)=>{
    if(req.body.roles){
        for(let i=0; i<req.body.roles.length;i++){
            if(!Roles.includes(req.body.roles[i])){
                res.status(400).send({message:"Error, ese rol no existe"});
                return;
            }
        }
    }
    next();
};

const verificarRegistro = {
    comprobarUsuarioOEmail:comprobarUsuarioOEmail,
    comprobarRol:comprobarRol
};

module.exports = verificarRegistro;
