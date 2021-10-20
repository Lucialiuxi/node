// 通过监听stream的事件来获取子进程的输出内容
'use strict';

const fs = require('fs');
const { spawn } = require('child_process');
const filename = process.argv[2];

if (!filename) {
    throw Error('必须要指定监听的文件！');
} 

fs.watch(filename, () => {
    const ls = spawn('ls', ['-l', '-h', filename]); // 创建子进程
    let output = ''; // 用于暂存子进程输出的内容

    ls.stdout.on('data', chunck => {
        console.log('chunck 是', chunck);
        output += chunck;
    });

    ls.on('close', () => {
        console.log('output 是', output);
        const parts = output.split(/\s+/); // 按空白符切割
        console.log('parts--打印', parts);
    });

});

console.log(`开始监听的文件${filename}的变化`);
// command: node watcher-spawn-parse.js target.txt
