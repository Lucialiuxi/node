'use strict';

const cluster = require('cluster'); // 集群
const fs = require('fs');
const { cpus, freemem } = require('os')
const zmq = require('zeromq');

const numWorkers = cpus().length;

if (cluster.isMaster) {

    // 主进程创建ROUTER和DEALER套接字并绑定端点。
    const router = zmq.socket('router').bind('tcp://127.0.0.1:60401');
    const dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc');

    //在router和dealer之间转发消息
    router.on('message', (...frames) => dealer.send(frames));
    dealer.on('message', (...frames) => router.send(frames));

    // listen for workers to come online
    cluster.on('online', work => {
        console.log(`worker ${work.process.pid} is online`);
    });

    // fork a worker process for each CPU
    for(let i = 0; i < numWorkerss; i++) {
        cluster.fork();
    }
    
} else {
    // worker processes create a REP socket and connect to the DEALER
    const responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc');

    responder.on('message', data => {
        // parse incoming message
        const request = JSON.parse(data);
        console.log(`${process.pid} 接收来自: ${request.path}的请求`);

        // read the file and reply with content.
        fs.readFile(request.path, (err, content) => {
            console.log( `${process.pid} 发送响应`);
            responder.send(JSON.stringify({
                content: content.toString(),
                timeStamp: Date.now(),
                pid: process.pid,
            }))
        });
    });
}