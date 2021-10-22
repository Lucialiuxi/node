'use strict';

const net = require('net');
const client = net.connect({ port: 4000 });

client.on('data', data => {
    const message = JSON.parse(data);
    if (message.type === 'watching') {
        console.log(`现在监听：${message.type}`);
    } else if (message.type === 'changed') {
        const date = new Date(message.timeStamp);
        console.log(`文件变化了:${date}`);
    } else {
        console.log(`不可识别的消息类型：${message.type}`);
    }

});
/**command: [都在WSL终端执行]

    node net-watcher-json-client.js

 */