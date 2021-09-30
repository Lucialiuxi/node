const net = require('net');
const lessonData = require('../pub/lessonList');
const { checkComplete } = require('./utils');


const lessonIds = Object.keys(lessonData);

const socket = new net.Socket({});

socket.connect({
    host:'localhost',
    port: 4000,
});

let id = Math.floor(Math.random() * lessonIds.length);

let oldBuffer = null;
socket.on('data', buffer => {
    // 把上一次的data事件使用的残余的buffer接上来
    if (oldBuffer) {
        buffer = Buffer.concat([oldBuffer, buffer]);
    }

    let completeLength = 0;
    console.log('while-执行前', completeLength)
    // 只要存在可以解成完整包的包长
    while(completeLength = checkComplete(buffer)) {
        console.log('while-执行--中', completeLength)
        const package = buffer.slice(0, completeLength);
        buffer = buffer.slice(completeLength);

        // 把这个包解成数据和seq
        const result = decode(buffer);
        console.log(`包${result.seq}, 返回值是${result.data}`);
    }

    // 把残余的buffer记下来
    oldBuffer = buffer;
});

/**
 * 二进制包解码函数
 * 在一段rpc调用里，服务端需要经常解码rpc调用时，业务数据的请求包
 */
 function decode(buffer) {
    const header = buffer.slice(0, 6);
    const seq = header.readInt16BE();

    const body = buffer.slice(6);

    // 这里把seq和数据返回出去
    return { seq, data: body.toString() };
}

let seq = 0;

/**
 * 二进制包编码函数
 * 在一段rpc调用里，客户端需要经常编码rpc调用时，业务数据包的请求包
 * 
 */
function encode(data) {
    //正常情况下，这里应该使用protobuf来encode一段代表业务数据的数据包
    // 为了不混淆重点，这个例子比较简单，就直接把课程id转buffer发送
    const body = Buffer.alloc(4);
    body.writeInt32BE(lessonIds[data.id]);

    //一般来说，一个rpc调用的数据包会分为定长的包头和不定长的包体两部分
    // 包头的作用就是用来记载包的序号和包的长度，以实现全双工通信
    const header = Buffer.alloc(6);
    header.writeInt16BE(seq);
    header.writeInt32BE(body.length, 2);

    //包头和包体拼接起来发送
    const buffer = Buffer.concat([header, body]);

    console.log(`包${seq}传输的课程id为${lessonIds[data.id]}`);

    seq++;

    return buffer;
};


for(let k = 0; k < 100; k++) {
    id = Math.floor(Math.random()*lessonIds.length);
    socket.write(encode({id}));
}