const net = require('net');

const serverip = '0.0.0.0'
// const serverip = '127.0.0.1'
// const serverip = '187.189.149.242'

const server = net.createServer(function(socket) {
  //socket.write('Echo server\r\n');

  socket.on('data', (data) => {
    var response = data.toString().trim();
    console.log(response);
    if (/\#\#\,/.test(response)) {
      socket.write("LOAD");
    }
    else if (/\d{15}\;/.test(response)) {
      socket.write("ON");
      let substring = response.substring(0,15);
      setTimeout(()=>{socket.write("**,imei:"+substring+",B;")},1000);
    }
    else {
      if (/^imei.*/.test(response)) {
        let data = response.split(/,/);
        let lat = data[7];
        let long = data[9];
        // calculate latitude
        let deg = parseInt(lat.substring(0,2));
        let min = parseFloat(lat.substring(2,lat.length));
        deg += (min*60/3600);
        lat = deg;
        lat = data[8] === 'S'? lat*-1: lat;

        // calculate longitude
        deg = parseInt(long.substring(0,3));
        min = parseFloat(long.substring(3,long.length));
        deg += (min*60/3600);
        long = deg;
        long = data[10] === 'W'? long*-1: long;

        // speed
        const speed = parseFloat(data[11]);
        //imei
        const imei = parseInt(data[0].split(/:/)[1]);
        console.log('imei:'+imei+' latitude:'+lat+' longitude:'+long+' speed:'+speed);
      }
      socket.write("ON");
    }
  });

  socket.on('end', function() {
    console.log('client disconnected');
  });
});

server.on('error', (error) => {console.log(error)});

server.listen(1313);
console.log('Listening at '+serverip+':1313');
//https://gps-api-morelia.herokuapp.com/
