'use strict';

// 基于TCP的消息发布

const fs = require('fs');
const zmq = require('zeromq');
const filename = process.argv[2];

// create the publisher endpoint
const publisher = zmq.socket('pub');

fs.watch(filename, () => {

    // send a message to any and all subscibers.
    publisher.send(JSON.stringify({
        type: 'changed',
        file: filename,
        timeStamp: Date.now(),
    }));

    // Listen on TCP port 60400
    publisher.bind('tcp://*:60400', err => {
        if(err) {
            throw err;
        }
        console.log('listen for zmq subscribers...');
    });
});

/**
 command:
 node zmq-watcher-pub.js target.txt
 */