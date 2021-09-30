var playerAction = process.argv[process.argv.length - 1];
const game = require('./lib');

let count = 0;
process.stdin.on('data', e => {
    const playerAction = e.toString().trim();
    const result = game(playerAction);
    console.log('result--', result);
    if (result === -1) {
        count++;
    }
    if (count === 3) {
        console.log('我不玩了');
        process.exit(); // 电脑输到第三次，杀掉进程
    }
});