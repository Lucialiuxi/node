const Chat = function(socket) {
    this.socket = socket;
    console.log('789789789',this);
};

// 发送聊天消息
Chat.prototype.sendMessage = function(room, text) {
    console.log('发送聊天消息')
    let message = { room, text };
    this.socket.emit('message', message);
}

// 变更房间
Chat.prototype.changeRoom = function(room) {
    this.socket.emit('join', { newRoom: room });
}

/**
 * 处理聊天命令
 * @param {*} command  string
 * 
 * 【
 *  关于聊天室的命令command:
 *      修改昵称：/nick 用户昵称
 *      加入/新建房间：/join 聊天室昵称
 * 】
 */
Chat.prototype.processCommand = function(command) {
    let words = command.split(' ');
    // 解析命令的第一个单词
    let usedCommand = words[0].substring(1, words[0].length).toLowerCase();

    let name = words[1];

    let message = false;

    switch(usedCommand) {
        case 'join': // 加入/创建房间
            this.changeRoom(room);
            break;
        
        case 'nick': // 修改昵称
            this.socket.emit('nameAttempt', name);
            break;
        
        default: // 如果命令无法识别，返回错误消息
            message = '该命令无法识别';
            break;
    }

    return message;
}