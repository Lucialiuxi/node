'use strict';

const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if(!filename) {
    throw Error('没有指定文件名');
}

const server = net.createServer(connection => {
 // 使用connection对象进行数据传输
    console.log('已经连接');
    console.log(`现在开始监听文件${filename}的变化`);

    // 设置监听
    const watcher = fs.watchFile(filename, (current, previous) => {
        let type = 'watching';
        let timeStamp = new Date();
        if (current.mtime !== previous.mtime) {
            type = 'changed';
            timeStamp = current.mtime;
        }
        // 建立连接时发送给客户端
        const content = JSON.stringify({
            type,
            timeStamp,
        })
        connection.write(content + '\n');
    });

    connection.on('close', () => {
        console.log('连接断开');
        // 关闭文件
        watcher.close();
    });
});

server.listen(4000, () => {
    console.log('监听4000端口');
});

/**command: [都在WSL终端执行]

    node net-watcher-json-service.js target.txt

    nc 127.0.0.1 4000

 */