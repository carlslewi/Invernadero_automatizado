module.exports = serv => {
    //Introducir temperatura
    const temperaturas = require("../controladores/temperatura.controlador");
    const humedads = require("../controladores/humedad.controlador");
    const luminosidads = require("../controladores/luminosidad.controlador");
    var ruta = require("express").Router();

    //Intro temperatura
    ruta.post("/temperaturas/",temperaturas.create);
    ruta.get("/temperaturas", temperaturas.findAll);
    ruta.get("/temperaturasFechas", temperaturas.findFechas);
    ruta.get("/temperaturaMaxDia", temperaturas.findTempDiaMax);
    ruta.get("/temperaturaMinDia", temperaturas.findTempDiaMin);
    ruta.get("/temperaturault", temperaturas.findLastTemp);
    ruta.get("/temperaturamax", temperaturas.findTempMax);
    ruta.get("/temperaturamin", temperaturas.findTempMin);
    ruta.get("/temperaturashoras", temperaturas.findTemps);
    ruta.delete("/temperaturas", temperaturas.deleteAll);

    //Intro humedad

    ruta.post("/humedades/",humedads.create);
    ruta.get("/humedades", humedads.findAll);
    ruta.get("/humedadesFechas", humedads.findFechas);
    ruta.get("/humedadMaxDia", humedads.findHumDiaMax);
    ruta.get("/humedadMinDia", humedads.findHumDiaMin);
    ruta.get("/humedadult", humedads.findLastHum);
    ruta.get("/humedadmax", humedads.findHumMax);
    ruta.get("/humedadmin", humedads.findHumMin);
    ruta.get("/humedadeshoras", humedads.findHums);
    ruta.delete("/humedades", humedads.deleteAll);

    //Intro luminosidad
    ruta.post("/luminosidades/",luminosidads.create);
    ruta.get("/luminosidades", luminosidads.findAll);
    ruta.get("/luminosidadesFechas", luminosidads.findFechas);
    ruta.get("/luminosidadMaxDia", luminosidads.findLumDiaMax);
    ruta.get("/luminosidadMinDia", luminosidads.findLumDiaMin);
    ruta.get("/luminosidadult", luminosidads.findLastLum);
    ruta.get("/luminosidadmax", luminosidads.findLumMax);
    ruta.get("/luminosidadmin", luminosidads.findLumMin);
    ruta.get("/luminosidadeshoras", luminosidads.findLums);
    ruta.delete("/luminosidades", luminosidads.deleteAll);
    
    serv.use('/api/', ruta);
};
