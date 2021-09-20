const glob = require('glob');

// 阻塞I/O
let result = null;
console.time('阻塞')
result= glob.sync(__dirname + '/**/*');
console.timeEnd('阻塞');
console.log(result);