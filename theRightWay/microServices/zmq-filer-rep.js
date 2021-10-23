// 实现响应器

'use strict';

const fs = require('fs');
const zmq = require('zeromq');

// socket to reply to client requests.
const responder = zmq.socket('rep');

// handle incoming requests.
responder.on('message', data => {

    // parse the incoming message.
    const request = JSON.parse(data);
    console.log(`已收到获取的请求: ${request.path}`);

    // read the file and reply with content.
    fs.readFile(request.path, (err, content) => {
        console.log('发送响应内容');

        responder.send(
            JSON.stringify({
                content: content.toString(),
                timeStamp: Date.now(),
                pid: process.pid,
            })
        );

    });
});

// listen on TCP port 60401
responder.bind('tcp://127.0.0.1:60401', err => {
    console.log('监听zmq请求者.');
});

// close the responder when the Node process ends.
process.on('SIGINT', () => {
    console.log('关闭');
    responder.close();
});
/**
 command:
    node zmq-filer-rep.js
 */