module.exports = serv => {
    //Introducir temperatura
    const temperaturas = require("../controladores/temperatura.controlador");
    var ruta = require("express").Router();

    //Intro temperatura
    ruta.post("/",temperaturas.create);
    ruta.get("/", temperaturas.findAll);
    
    serv.use('/api/temperaturas', ruta);
};
