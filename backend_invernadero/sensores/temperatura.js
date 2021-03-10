module.exports = th => {
var sensort = require("node-dht-sensor");

sensort.read(11,4, function(err, temp, hum){
    if(!err){
        console.log(`temperatura: ${temp}, humedad: ${hum}`);
    }
});
};
