const net = require('net');
const lessonList = require('../pub/lessonList');

const lessonIds = Object.keys(lessonList);

let randomIndex = Math.floor(Math.random() * lessonIds.length);

const socket = new net.Socket({});

socket.connect({
    host:'localhost',
    port: 4000,
});

socket.write(encode(randomIndex));

socket.on('data', (buffer) => {
    console.log('结果:', buffer.toString());
    randomIndex = Math.floor(Math.random() * lessonIds.length)
    socket.write(encode(randomIndex));
});


function encode (index) {
    buffer = Buffer.alloc(4);
    buffer.writeInt32BE(lessonIds[index]);
    return buffer;
}