
// 处理显示可疑文本
function divEscapeContentElement(message) {
    return $('<div></div>').text(message); // jquery的方法
}

// 显示正常的文本数据
function divSystemContentElement(message) {
    return $('<div></div>').html('<li class="notice">' + message + '</li>');
}

// 处理原始的用户输入
function processUserInput(chatApp, socket) {
    console.log('处理原始的用户输入', socket.id)
    let message = $('#send-message').val();
    let systemMessage;

    console.log('处理原始的用户输入--message', message);

    if (message.charAt(0) == '/') { // 如果用户输入的内容跟以斜杠开头，将其视为聊天命令
        systemMessage = chatApp.processCommand(message);
        if(systemMessage) {
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    } else {
        // 将非命令输入广播给其他用户
        chatApp.sendMessage(
            $('#room').text(),
            message,
        );
        $('#messages').append(divSystemContentElement(message));
        $('#messages').scrollTop($('#message').prop('scrollHeight'));

    }

    $('#send-message').val(''); // 清空输入框
};



// 客户端程序初始化逻辑
let socket = io.connect();

$(document).ready(function(){

    let chatApp = new Chat(socket);


    // 添加更名的事件监听器 and显示更名尝试的结果
    socket.on('nameResult', function(result) {
        let message;
        if (result.success){
            message = '你的昵称已更改为' + result.name + '.';
        } else {
            message = result.message;
        }
        $('#messages').append(divSystemContentElement(message));
    });


    // 添加房间变更的事件监听器 and显示房间变更结果
    socket.on('joinResult', function(result) {
        $('#room').text(result.room);
        $('#messages').append(divSystemContentElement('您已更换聊天室.'));
    });



    // 显示接收到的消息
    socket.on('message', function(message) {
        let newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    });


    // 显示可用房间列表
    socket.on('rooms', function(rooms){
        console.log('显示可用房间列表---rooms', rooms)
        $('#room-list').empty();

        // 渲染所有房间
        for(let room in rooms) {
            room = room.substring(1, room.length);
            if (room !== '') {
                $('#room-list').append(divEscapeContentElement(room));
            }
        }

        // 点击房间名切换房间
        $('#room-list div').click(function() {
            chatApp.processCommand('/join ' + $(this).text());
            $('#send-message').focus();
        });
    });


    // 定期请求可用房间列表
    setInterval(function() {
        socket.emit('rooms');
    }, 1000);

    $('#send-message').focus();

    // 提交表单可以发送聊天消息
    $('#send-button').click(function(){
        console.log('提交表单可以发送聊天消息')
        processUserInput(chatApp, socket);
        return false;
    });
});