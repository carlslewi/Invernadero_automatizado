module.exports = serv => {
    //Introducir temperatura
    const temperaturas = require("../controladores/temperatura.controlador");
    const humedades = require("../controladores/humedad.controlador")
    var ruta = require("express").Router();

    //Intro temperatura
    ruta.post("/temperaturas/",temperaturas.create);
    ruta.get("/temperaturas", temperaturas.findAll);
    ruta.get("/temperaturasFechas", temperaturas.findFechas)
    ruta.get("/temperaturault", temperaturas.findLastTemp);
    ruta.get("/temperaturamax", temperaturas.findTempMax);
    ruta.get("/temperaturamin", temperaturas.findTempMin);
    ruta.get("/temperaturashoras", temperaturas.findTemps);
    ruta.delete("/temperaturas", temperaturas.deleteAll);

    //Intro humedad

    ruta.post("/humedades/", humedades.create);
    ruta.get("/humedades/", humedades.findAll);

    //Intro luminosidad

    //ruta.post("/luminosidades/",luminosidades.create);
    //ruta.get("/luminosidades/", luminosidades.findAll);
    
    serv.use('/api/', ruta);
};
