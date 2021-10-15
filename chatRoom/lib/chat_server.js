const socketio = require('socket.io');

let io;
let guestNumber = 1;
let nickNames = {}; // 储存用户昵称的 {socketId: name}
let namesUsed = []; //  保存已经被占用的昵称 string[]
let currentRoom = {};


// 启动socket.io服务器
exports.listen = function(server) {
    io = socketio.listen(server); // 启动Socket.IO服务，允许它搭载在已有的HTTP服务器上
    io.set('log level', 1);

    io.sockets.on('connection', function(socket) {
        // 定义每个用户连接的处理逻辑

    });
};