const glob = require('glob');

// 阻塞I/O
let result = null;
console.time('阻塞')
result= glob.sync(__dirname + '/**/*');
console.timeEnd('阻塞');
console.log(result.length);

// 非阻塞I/O
let result1 = null;
console.time('非阻塞');
glob(__dirname, +'/**/*', function(err, matches) {
    result1 = matches;
    console.log('拿到结果了');
});

console.timeEnd('非阻塞');
