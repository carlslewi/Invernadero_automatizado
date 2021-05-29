const mqtt =require('mqtt'); //Nuestro servidor va a actuar tambien como cliente suscriptor
//const sub = mqtt.connect('mqtt://localhost')
const dir = require('../configdb/conf.mqtt')
const sub = mqtt.connect(`mqtt://${dir}`)
const db = require("../modelos");

sub.on('connect',()=>{
    sub.subscribe({'temperatura': {qos: 0}, 'humedad': {qos: 0}, 'luminosidad' : {qos:0}})
    console.log("Suscrito")
})

sub.on('message', (topic, message) => {
  const Temperatura = db.temperaturas;
  const Humedad = db.humedad;
  const Luminosidad = db.luminosidad;
  if(topic=="temperatura"){
    Temperatura.create({valor:parseFloat(message.toString())});}
  else if(topic=="humedad"){
    Humedad.create({valor:parseFloat(message.toString())});
  }
  else{
    Luminosidad.create({valor:parseFloat(message.toString())});
  }
  //console.log(message.toString())
  //sub.end()
})