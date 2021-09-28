const net = require('net');

const server = net.createServer((socket) => {
    // 写入数据
    socket.write('hello world');
    // 读数据
    socket.on('data', function(buffer) {
        console.log('buffer', buffer, buffer.toString());
    });
});

server.listen(4000);