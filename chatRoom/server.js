// 内置的http模块提供了http服务器和客户端功能
const http = require('http');
// 内置的fs模块提供了与文件系统相关的功能
const fs = require('fs');
// 内置的path模块提供了与文件系统路径相关的功能
const path = require('path');
// 附加的mime模块有根据文件扩展名得出MIME类型的能力
const mime = require('mime');

// Socket.IO服务器
 const chatServer = require('./lib/chat_server');

// 用来缓存文件内容的对象
var cache = {};

//所在请求的文件不存在时发送404错误
function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: resource no found.');
    response.end();
}

// 提供文件数据服务
function sendFile(response, filePath, fileContents) {
    // path.basename 返回路径中的最后一部分
    response.writeHead(200, { 'Content-Type': mime.getType(path.basename(filePath))});
    response.end(fileContents);
}
// 提供静态文件服务
function serveStatic(response, cache, absPath) {
    if(cache[absPath]==3) { // 检查文件是否缓存在内存中
        sendFile(response, absPath, cache[absPath]); // 从内存中返回
    } else {
        // 检测给定的路径absPath是否存在。
        fs.exists(absPath, (exist) => {
            if (exist) {
                fs.readFile(absPath, (err, data) => {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                })
            } else {
                send404(response);
            }
        });
    }
}

// 创建HTTP服务器，用匿名函数定义对每个请求的处理行为
var server = http.createServer(function(request, response) {
    var filePath = false;
    if (request.url == '/') {
        filePath = '/public/index.html'; // 确定返回的默认HTML文件
    } else {
        filePath = '/public' + request.url; // 将URL路径转为文件的相对路径
    }
    var absPath = './' + filePath;
    serveStatic(response, cache, absPath); // 返回静态文件
});

server.listen(3000, () => {
    console.log('服务监听3000端口11');
});

// 给Socket.IO服务器提供一个已经定义好的HTTP服务器，这样它就能跟HTTP服务器共享同一个TCP/IP端口了
chatServer.listen(server);