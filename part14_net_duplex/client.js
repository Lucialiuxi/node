const net = require('net');
const lessonList = require('../pub/lessonList');

const lessonIds = Object.keys(lessonList);

let randomIndex = Math.floor(Math.random() * lessonIds.length);

const socket = new net.Socket({});

let seq = 0;

function encode (index) {
    buffer = Buffer.alloc(6);
    buffer.writeInt16BE(seq);
    buffer.writeInt32BE(lessonIds[index], 2);
    // console.log('顺序--seq', seq, lessonIds[randomIndex])
    seq++;
    return buffer;
}

socket.connect({
    host:'localhost',
    port: 4000,
});

// 客户端50毫秒请求一次，服务端随机返回
setInterval(() => {
    socket.write(encode(randomIndex));
}, 50);

socket.on('data', (buffer) => {
    const seqBuffer = buffer.slice(0, 2);
    const titleBuffer = buffer.slice(2);
    console.log('返回结果----顺序是', seqBuffer.readInt16BE(), '课程是', titleBuffer.toString());
    randomIndex = Math.floor(Math.random() * lessonIds.length)
    socket.write(encode(randomIndex));
});
