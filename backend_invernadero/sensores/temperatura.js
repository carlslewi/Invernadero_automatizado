
const sensort = require("node-dht-sensor");

var sth = sensort.read(11,4) //(tipo de sensor, en este caso es el dht11 y pin gpio al que va conectado)

exports.sth = sth;