// 创建子进程：监听到文件变化后，创建一个子进程，再用这个子进程执行系统命令
'use strict';

const fs = require('fs');
const { spawn } = require('child_process');
const filename = process.argv[2];

if (!filename) {
    throw Error('必须要指定监听的文件！');
} 

fs.watch(filename, () => {
    const ls = spawn('ls', ['-l', '-h', filename]);
    ls.stdout.pipe(process.stdout);
});

console.log(`开始监听的文件${filename}的变化`);
// command: node watcher-spawn.js target.txt
