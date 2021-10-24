// 发起请求
'use strict';

const zmq = require('zeromq');
const filename = process.argv[2];

// create request endpoint.
const requester = zmq.socket('req');

// handle replies form the responder.
requester.on('message', data => {
    const response = JSON.parse(data);
    console.log(`接收到响应：`, response);
    
});

requester.connect('tcp://localhost:60401');

// send a request for content.
console.log(`向${filename}发送一个请求`);
requester.send(JSON.stringify({ path: filename }));
