'use strict';

const netClient = require('net').connect({ port: 4000 });
const ldjClient = require('./lib/lbj-client.js').connect(netClient);

ldjClient.on('message', message => {
    if (message.type === 'watching') {
        console.log(`现在监听：${message.type}`);
    } else if (message.type === 'changed') {
        const date = new Date(message.timeStamp);
        console.log(`文件变化了:${date}`);
    } else {
        console.log(`不可识别的消息类型：${message.type}`);
    }
});
/**
 * command:
    node test-json-service.js
    node net-watcher-ldj-client.js
 */