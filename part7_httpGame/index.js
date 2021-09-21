const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const game = require('./game');

let playerWin = 0;
let playerLastAction = undefined;
let sameCount = 0;

http.createServer(function(request, response) {
    const parseUrl = url.parse(request.url);
    const query = querystring.parse(parseUrl.query);
    const playerAction = query.action;
    // console.log('---parseUrl.pathname', parseUrl.pathname)
    if (parseUrl.pathname== "/favicon.ico") {
        response.writeHead(200);
        response.end();
        return;
    }
    if (parseUrl.pathname== "/") {
        fs.createReadStream(__dirname + "/index.html")
        .pipe(response);
    }

    if (playerWin >= 3) { // 电脑连续输了3次
        response.writeHead(500);
        response.end('不和你玩儿了');
    }
    if (playerLastAction && playerLastAction === playerAction) {
        sameCount++;
    }
    if (sameCount >= 3) {
        response.writeHead(400);
        response.end('作弊！不玩儿了！')
    }
    if (parseUrl.pathname === '/game') {
        console.log('parseUrl.query', parseUrl.query)
        playerLastAction = query.action;
    
        const gameResult = game(playerAction);
        if (gameResult === 0) {
            response.end('平局');
        } else if (gameResult === 1) {
            response.end('玩家输');
        } else {
            playerWin++;
            response.end('玩家赢');
        }
    }
}).listen(3000);