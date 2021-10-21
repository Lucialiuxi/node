'use strict';
const fs = require('fs');

fs.createReadStream(process.argv[2])
.on('data', chunck => {
    process.stdout.write(chunck);
})
.on('error', err => {
    process.stderr.write(`ERROR: ${err.message}`);
});

// command: node read-stream.js no-such-file
// command: node read-stream.js target.txt

// mkdir创建文件夹
fs.mkdir('fsCustomDir', (err) => {
    console.log('mkdir创建文件夹');
    if (err) process.stderr.write(err);
});

// unlink删除文件
fs.unlink('a.txt', err => {
    if (err) {
        throw err;
    }
});

// copyFile复制文件
fs.copyFile('target.txt', 'copy-target.txt', (err) => {
    if (err) {
        throw err;
    }
});
