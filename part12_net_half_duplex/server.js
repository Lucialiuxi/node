const net = require('net');
const lessonList = require('../pub/lessonList');

const server = net.createServer(socket => {
    socket.on('data', (buffer) => {
        const lessonId = buffer.readInt32BE();
        const title = Buffer.from(lessonList[lessonId]);
        
        setTimeout(() => {
            socket.write(title);
        }, 500)
    })
});

server.listen(4000);