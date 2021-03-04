
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort("/dev/ttyACM0", {
  baudRate: 9600
});
const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

parser.on('open', function () {
  console.log('connection is opened');
});

parser.on('data', function (data) {
  let temp = parseFloat(data, 10);
  console.log(temp);
});

parser.on('error', (err) => console.log(err));
port.on('error', (err) => console.log(err));