const mqtt = require('mqtt')
const pub = mqtt.connect('mqtt://localhost')
const th = require('./sensores/temperatura')
const http = require('./http-common')

var tiempo = 5000; // variable que usaremos para indicar cada cuantos milisegundos publicamos y guardamos 

pub.on('error',(error)=>{
  console.log("Error de conexion en publicador" + error);
  process.exit(1);
})

pub.on('connect', () => {
  if(pub.connected){
    console.log("Publicador conectado");
    //Publicamos y guardamos cada cierto tiempo
    setInterval(()=>{pub.publish('temperatura', th.sth);
                     http.instance.post("/temperaturas/",{valor:th.sth});       
                              },tiempo);
  }else{console.log('Ha ocurrido algo raro')}
})

