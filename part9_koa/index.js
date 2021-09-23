const fs = require('fs');
const koa = require('koa');
const mount = require('koa-mount');

const game = require('../pub/game');
const hmltDir = require('../pub/method').getHtmlDirname(__dirname);

let playerWin = 0;
let playerLastAction = undefined;
let sameCount = 0;

const app = new koa();
app.use(
    mount('/', function(ctx, next) {
        ctx.response.body = fs.readFileSync(hmltDir, 'utf-8');
        next();
    }),
);

app.use(
    mount('/favicon.ico', function(ctx, next) {
        ctx.status = 200;
        next();
    }),
);

const gameKoa = new koa();

app.use(mount('/game', gameKoa));

gameKoa.use(async function(ctx, next) {
    const playerAction = ctx.request.query.action;
    if (playerWin >= 3) { // 电脑连续输了3次
        ctx.response.body = '不和你玩儿了';
        ctx.status = 500;
    }
    if (playerLastAction && playerLastAction === playerAction) {
        sameCount++;
    }
    playerLastAction = playerAction;
    ctx.playerAction =  playerAction;
    if (playerWin < 3) {
        await next(); // 调用next后，就能写get的第下个参数（回调函数）
    }
});

gameKoa.use(async function(ctx, next) {
    console.log('sameCount', sameCount, sameCount >= 3)
    if (sameCount >= 3) { // 玩家连续出3次一样的
        ctx.response.body = '作弊！不玩儿了！';
        ctx.status = 400;
    } else {
        await next();
    }
});
   
gameKoa.use(async function(ctx, next) {
    console.log('新的一轮')
    const gameResult = game(ctx.playerAction);
    if (gameResult === 0) {
        ctx.response.body = '平局';
    } else if (gameResult === 1) {
        ctx.response.body = '玩家输';
    } else {
        playerWin++;
        ctx.response.body = '玩家赢';
    }
    await next();
});

app.listen(3000);