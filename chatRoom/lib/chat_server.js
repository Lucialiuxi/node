const socketio = require('socket.io');
const {
    assignGuestName, // 分配用户昵称
    joinRoom, // 进入聊天室
    handleNameChangeAttempts, // 更名请求的处理
    handleMessageBroadcasting, // 发送聊天消息
    handleRoomJoining, // 加入/创建房间
    handleClientDisconnection, // 用户断开连接
} = require('../public/javascripts/uitils');

let io;
let guestNumber = 1; // 程序自动分配的昵称基本都是 'Guest'+guestNumber , 有新用户连接进来guestNumber就网上增长
let nickNames = {}; // 储存用户昵称的 {socketId: name}
let namesUsed = []; //  保存已经被占用的昵称 string[]
let currentRoom = {}; // 储存聊天室名称的 {socketId: roomName}


// 启动socket.io服务器
exports.listen = function(server) {
    io = socketio(server); // 启动Socket.IO服务，允许它搭载在已有的HTTP服务器上
    // io.set('log level', 1);

     // 定义每个用户连接的处理逻辑
    io.sockets.on('connection', function(socket) {
        // 在用户连接上来时 赋予其一个访客名
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        
        // 在用户连接上来时，把他放入聊天室Lobby里
        joinRoom(socket, 'Lobby', currentRoom, nickNames);

        // 处理用户的消息，更名，以及聊天室的创建和变更
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed, currentRoom);
        handleRoomJoining(socket, currentRoom);

        // 用户发出请求时，向其提供已经被占用的聊天室的列表
        socket.on('rooms', function() {
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        // 定义用户断开连接后的清除逻辑
        handleClientDisconnection(socket, namesUsed, nickNames);
    });
};
