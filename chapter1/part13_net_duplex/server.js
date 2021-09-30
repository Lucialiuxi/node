const net = require('net');
const lessonList = require('../pub/lessonList');

const server = net.createServer(socket => {
    socket.on('data', (buffer) => {
        const seqBuffer = buffer.slice(0, 2);
        const lessonId = buffer.readInt32BE(2);
        setTimeout(() => {
            const title = Buffer.from(lessonList[lessonId]);
            const result = Buffer.concat([seqBuffer, title]);
            socket.write(result);
        }, 500)
    })
});

server.listen(4000);