const net = require('net');

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

server.listen(1313, '192.168.100.4');
console.log('Listening at 192.168.100.4:1313');
//https://gps-api-morelia.herokuapp.com/
