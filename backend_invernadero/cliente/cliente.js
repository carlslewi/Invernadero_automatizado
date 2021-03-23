const mqtt =require('mqtt'); //Nuestro servidor va a actuar tambien como cliente subscriptor
const sub = mqtt.connect('mqtt://localhost')

sub.on('connect',()=>{
    sub.subscribe('temperatura')
    console.log("Suscrito")
})

sub.on('message', (topic, message) => {
  console.log(message.toString())
  //sub.end()
})