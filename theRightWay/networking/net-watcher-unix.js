'use strict';

const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if (!filename) {
    throw Error('没有指定文件名');
}

const server = net.createServer(connnection => {
// 使用connection对象进行数据传输
    console.log('开始连接');
    console.log(`现在开始监听文件${filename}的变化`);

    // 设置监听
    const watcher = fs.watch(filename, (str) => {
        console.log('设置监听', str);
        // 建立连接时发送给客户端
        connnection.write(`文件变化了:${new Date()}`);
    });

    connnection.on('close', () => {
        console.log('连接断开');
        // 关闭监听
        watcher.close();
    })
});

server.listen('/tmp/watcher.sock', () => {
    console.log('监听---/tmp/watcher.sock');
});

/**command:[都在WSL终端执行]
 
 node net-watcher-unix.js target.txt

 nc -U /tmp/watcher.sock

 */