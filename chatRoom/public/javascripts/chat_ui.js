// 处理显示可疑文本
function disEscapeContentElement(message) {
    return $('<div></div>').text(message); // jquery的方法
}

// 显示正常的文本数据
function divSystemContentElement(message) {
    return $('<div></div>').html('<li>' + message + '</li>');
}

// 处理原始的用户输入
function processUserInput(chatApp, socket) {
    let message = $('#send-message').val();
    let systemMessage;

    if (message.chatAt(0) == '/') { // 如果用户输入的内容跟以斜杠开头，将其视为聊天命令
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
    }

    $('#send-message').val(''); // 清空输入框
}