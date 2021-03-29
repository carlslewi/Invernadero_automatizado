const mqtt = require('mqtt')
const pub = mqtt.connect('mqtt://localhost')
const th = require('../sensores/temperatura')
const http = require('../http-common')

var tiempo = 10000; // variable que usaremos para indicar cada cuantos milisegundos publicamos y guardamos 

pub.on('error',(error)=>{
  console.log("Error de conexion en publicador" + error);
  process.exit(1);
})

pub.on('connect', () => {
  if(pub.connected){
    console.log("Publicador conectado");
    //Publicamos y guardamos cada cierto tiempo
    setInterval(()=>{pub.publish('temperatura', th.sth.temperature.toFixed(1));
                     http.instance.post("/temperaturas/",{valor:th.sth.temperature.toFixed(1)});       
                              },tiempo);
    setInterval(()=>{pub.publish('humedad', th.sth.humidity.toFixed(1));
                    http.instance.post("/humedades/",{valor:th.sth.humidity.toFixed(1)});       
                    },tiempo);
    setInterval(()=>{pub.publish('luminosidad', th.sth.humidity.toFixed(1));
                    http.instance.post("/luminosidades/",{valor:th.sth.humidity.toFixed(1)});       
                    },tiempo);
  }else{console.log('Ha ocurrido algo raro')}
})

