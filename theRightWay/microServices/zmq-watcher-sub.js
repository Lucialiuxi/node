// 订阅消息
 'use strict';

 const zmq = require('zeromq');

 // create subscriber endpoint
 const subsciber = zmq.socket('sub');

 // subscribe to all messages.
 subsciber.subscribe('');


 // handle messages from the publisher.
 subsciber.on('message', data => {
    const message = JSON.parse(data);
    const date = new Date(message.timeStamp);
    console.log(`file "${message.file}" changed at ${date}`);
 });

 // connect to publisher.
 subsciber.connect('tcp://localhost:60400');

 /**
  command:
  node zmq-watcher-sub.js
  touch target.txt -a
  */