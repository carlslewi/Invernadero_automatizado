const SerialPort = require("serialport")
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort('/dev/ttyACM1', {
  baudRate: 9600
});

const mqtt = require('mqtt')
const pub = mqtt.connect('mqtt://localhost')
const http = require('../http-common')

const parser = port.pipe(new ReadLine({ delimiter: '\n' }));

pub.on('error',(error)=>{
  console.log("Error de conexion en publicador" + error);
  process.exit(1);
})

pub.on('connect', () => {
  if(pub.connected){
    port.on('open', ()=> {
      console.log('conexion establecida');
    });
    port.on('error', function(err) {
      console.log('Error: ', err.message)
    })
      console.log("Publicador conectado");
      parser.on('data', function (data) {
        var sensores=data.split(",");
          var temp=sensores[0];
          var hum=sensores[1];
        //console.log(parseFloat(data))
        //Publicamos y guardamos cada cierto tiempo
        pub.publish('temperatura', temp);
        http.instance.post("/temperaturas/",{valor:parseFloat(temp).toFixed(1)});       
                      
        pub.publish('humedad', hum);
        http.instance.post("/humedades/",{valor:parseFloat(hum).toFixed(1)});                    
        /*pub.publish('luminosidad', th.sth.humidity.toFixed(1));
          http.instance.post("/luminosidades/",{valor:th.sth.humidity.toFixed(1)});       
                        */
      })
    }else{console.log('Ha ocurrido algo raro')}
    
});



