'use strict';

const fs = require('fs');
const filename = process.argv[2];
console.log('---process.argv', process.argv);
/**
 [
    'D:\\安装\\node.exe',
    'D:\\githubFiles\\nodeLearning\\theRightWay\\watcher-argv.js',
    'target.txt'
]
 */
if (!filename) {
    throw Error('必须要指定监听的文件');
}
fs.watch(filename, () => {
    console.log(filename+'文件发生了变化');
});

console.log('now watching ' + filename + 'for changes...');

// command: node watcher-argv.js target.txt