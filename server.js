const net = require('net');

const serverip = '0.0.0.0'
// const serverip = '127.0.0.1'
// const serverip = '187.189.149.242'

const server = net.createServer(function(socket) {
  socket.write('Echo server\r\n');
  socket.pipe(socket);

  socket.on('data', (data) => {
    var response = data.toString().trim();
    console.log(response);
    if (response.match(/.imei./)) {
      socket.write("LOAD");
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
