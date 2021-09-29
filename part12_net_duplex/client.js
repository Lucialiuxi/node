const net = require('net');
const lessonList = require('../pub/lessonList');

const lessonIds = Object.keys(lessonList);

let randomIndex = Math.floor(Math.random() * lessonIds.length);

const socket = new net.Socket({});

let seq = 0;

function encode (index) {
    buffer = Buffer.alloc(6);
    seq++;
    buffer.writeInt16BE(seq);
    buffer.writeInt32BE(lessonIds[index], 2);
    return buffer;
}

socket.connect({
    host:'localhost',
    port: 4000,
});

socket.write(encode(randomIndex));

socket.on('data', (buffer) => {
    const seqBuffer = buffer.slice(0, 2);
    const titleBuffer = buffer.slice(2);
    console.log('结果:', seqBuffer.readInt16BE(), titleBuffer.toString());
    randomIndex = Math.floor(Math.random() * lessonIds.length)
    socket.write(encode(randomIndex));
});
