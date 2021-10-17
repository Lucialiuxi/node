/**
 * 聊天程序需要处理下面这些场景和事件：
 * 分配昵称
 * 房间更换请求
 * 昵称更换请求
 * 发送聊天消息
 * 房间创建
 * 用户断开连接
 */

/**
 * 分配用户昵称
 * @param {*} socket 
 * @param {*} guestNumber 
 * @param {*} nickNames 储存用户昵称的 {socketId: name}
 * @param {*} namesUsed 保存已经被占用的昵称 string[]
 */
 function assignGuestName (socket, guestNumber, nickNames, namesUsed) {
    let name = 'Guest' + guestNumber;

     // 把用户昵称跟客户端连接ID关联上
    nickNames[socket.id] = name;
    // console.log('----nickNames--', nickNames)
    // 让用户知道他们的昵称
    socket.emit('nameResult', {
        success: true,
        name,
    });

    // 存放已经被占用的昵称
    namesUsed.push(name);
    return guestNumber + 1; // 增加用来生成昵称的计数器
 };


 /**
  * 进入聊天室
  * @param {*} socket 
  * @param {*} room 
  * @param {*} currentRoom 
  * @param {*} nickNames  // 储存用户昵称的 {socketId: name}
  */ 
 function joinRoom(socket, room, currentRoom, nickNames, io) {
     // 让用户进入房间
     socket.join(room);

     // 记录用户的当前的房间
     currentRoom[socket.id] = room;

     // 让用户知道有他们进入了新的房间
     socket.emit('joinResult', { room });

     // 让原本房间里的其他用户知道有新用户进入了房间
     socket.to(room).emit('message', {
         text: nickNames[socket.id] + '加入房间：' + room + '.',
     });

     // 确定有哪些用户在这个房间里
     let usersInRoomSummary = '';

     const roomsInfo = io.sockets.adapter.rooms;
     let usersInRoom = new Set([]);
   
     roomsInfo.forEach((value, key) => {
        if (key === room) {
            usersInRoom = value;
        }
     });

    //  console.log('确定有哪些用户在这个房间里roomsInfo.size', roomsInfo.size)

     // 如果不止这一个用户在这个房间里，汇总下都是谁
     if (roomsInfo.size > 1) {
         usersInRoomSummary = '当前在房间 ' + room + '的用户有: ';
        // console.log('当前用户的昵称', nickNames[socket.id])
         usersInRoom.forEach((id) => {
            if (id !== socket.id) {
                // console.log('usersInRoomSummary', usersInRoomSummary)
                const punctuation = usersInRoomSummary ? ',' : '';
                usersInRoomSummary += punctuation + nickNames[id];
            }
         });
         if (usersInRoomSummary) usersInRoomSummary += '.';
     }
    //  console.log('usersInRoomSummary--汇总', usersInRoomSummary)
     // 将房间里其他用户的汇总发送给这个用户
     socket.emit('message', { text: usersInRoomSummary });
 }

 /**
  * 更名请求的处理逻辑
  * @param {*} socket 
  * @param {*} nickNames  储存用户昵称的 {socketId: name}
  * @param {*} namesUsed   保存已经被占用的昵称 string[]
  * @param {*} currentRoom 
  */
 function handleNameChangeAttempts(socket, nickNames, namesUsed, currentRoom) {
     // 添加 nameAttempt 【更名请求事件】的监听器
    socket.on('nameAttempt', function(name) {

        // 昵称不能以Guest开头
        if (name.indexOf('Guest') === 0) {
            socket.emit('nameResult', {
                success: false,
                message: '昵称不能以Guest开头',
            });
        } else {

            if (namesUsed.indexOf(name) === -1) {
                // 如果昵称还没被注册就注册上

                let previousName = nickNames[socket.id];
                let previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                delete namesUsed[previousNameIndex];
                nickNames[socket.id] = name;

                socket.emit('nameResult', {
                    success: true,
                    name,
                });

                // Socket.IO把消息播报给房间其他的用户
                socket.to(currentRoom[socket.id]).emit('message', {
                    text: previousName + '昵称改为' +name + '.',
                });

            } else {
                // 如果昵称已经被占用，给客户端发送给出错消息
                socket.emit('nameResult', {
                    success: false,
                    message: '昵称' + name + '已经在使用中了.',
                })

            }
        }

    });
 }

 /**
  * 发送聊天消息 【用户发射一个事件，表明消息是从哪个房间发出来的，以及消息的内容是什么；然后服务器将这个消息转发给同一个房间的所有用户】
  * @param {*} socket 
  * @param {*} nickNames 储存用户昵称的 {socketId: name}
  */
 function handleMessageBroadcasting(socket, nickNames){
     // 添加 message 【发送聊天消息】事件的监听器
    socket.on('message', function(message) {
        socket.to(message.room).emit('message', {
            text: nickNames[socket.id] + ': ' + message.text,
        })
    });
 };

 /**
  * 加入/创建房间 【添加用户加入已有房间的逻辑，如果房间还没有的话，则创建一个放】
  * @param {*} socket 
  * @param {*} currentRoom 
  * @param {*} io Socket.IO服务
  */
 function handleRoomJoining(socket, currentRoom,nickNames,io) {
    // 添加 join 【创建/加入房间】事件的监听器
    socket.on('join', function(room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom, currentRoom, nickNames, io);
    });
}


/**
 * 用户断开连接 【当用户离开聊天程序时，从nickNames和namesUsed中移除用户的昵称】
 * @param {*} socket 
 * @param {*} namesUsed 保存已经被占用的昵称 string[]
 * @param {*} nickNames 储存用户昵称的 {socketId: name}
 */
function handleClientDisconnection(socket, namesUsed, nickNames) {
    socket.on('disconnect', function() {
        let nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
};

module.exports = {
    assignGuestName,
    joinRoom,
    handleNameChangeAttempts,
    handleMessageBroadcasting,
    handleRoomJoining,
    handleClientDisconnection,
};