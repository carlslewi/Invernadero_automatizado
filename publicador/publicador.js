const SerialPort = require("serialport")
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
});

const mqtt = require('mqtt')
const pub = mqtt.connect('mqtt://localhost')

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
          var lum=sensores[2];
        //console.log(parseFloat(data))
        //Publicamos 
        pub.publish('temperatura', temp);       
                      
        pub.publish('humedad', hum);                    
        
        pub.publish('luminosidad', lum);
      })
    }else{console.log('Ha ocurrido algo raro')}
    
});



