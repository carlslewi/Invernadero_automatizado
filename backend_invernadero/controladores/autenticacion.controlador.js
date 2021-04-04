const db = require("../modelos");
const config = require("../configdb/configautenticacion");
const Usuario = db.usuario;
const Rol = db.rol;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.registro = (req, res) => {
    //Guardar usuario en la base de datos
    Usuario.create({
        nom_usuario : req.body.nom_usuario,
        password : bcrypt.hashSync(req.body.password,8),
        email : req.body.email 
    }).then(usuario => {
        if(req.body.roles){
            Rol.findAll({
              where : { rol : {[Op.or] : req.body.roles}  
            }
        }).then(roles => {
            usuario.setRoles(roles).then(()=>{
                res.send({message : "Usuario registrado correctamente"});
            });
        });
        }else{
            usuario.setRoles([1]).then(()=>{res.send({message:"Usuario registrado correctamente"});
        });
        }
    }).catch(err => {res.status(500).send({message:err.message})});
};

exports.login = (req, res)=>{
    Usuario.findOne({
        where:{
            nom_usuario:req.body.nom_usuario
        }
    }).then(usuario=>{
        if(!usuario){
            return res.status(404).send({message:"Usuario no registrado"});
        }
        var passwordValido = bcrypt.compareSync(req.body.password, usuario.password);

        if(!passwordValido){
            return res.status(401).send({
                accessToken:null,
                message:"Password incorrecto"
            });
        }

        var token = jwt.sign({id:usuario.id}, config.secret, {expiresIn:86400});
 
        var autoridades = [];
        usuario.getRoles().then(roles=>{
            for(let i=0; i<roles.length;i++){
                autoridades.push("ROL_"+roles[i].rol.toUpperCase());
            }
            res.status(200).send({
                id:usuario.id,
                nom_usuario: usuario.nom_usuario,
                email: usuario.email,
                roles: autoridades,
                accessToken:token
            });
        });
    }).catch(err => {
        res.status(500).send({message:err.message});
    });
};