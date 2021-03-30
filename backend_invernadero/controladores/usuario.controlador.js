exports.accesoPublico = (req,res) => {
    res.status(200).send("Contenido publico");
};

exports.accesoUsuario = (req,res) => {
    res.status(200).send("Contenido usuario");
};

exports.accesoAdministrador = (req,res) => {
    res.status(200).send("Contenido administrador");
};