const net = require('net');

const socket = new net.Socket({});

socket.connect({
    host: 'localhost',
    port: 4000
});

socket.write('Good morning every one');