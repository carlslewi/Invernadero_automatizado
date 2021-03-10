const tmp=0;
const th={};
const sensort = require("node-dht-sensor");
sensort.read(11,4, function(err, temp, hum){
    if(!err){
        th.tmp = temp;
        th.hm = hum; 
        console.log(`temperatura: ${temp}, humedad: ${hum}`);
    }
});

module.exports = th;
