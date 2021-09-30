const http = require('http');

http.createServer(function(request, response) {
    console.log('request.url', request.url);
    if (request.url === "/favicon.ico") {
        response.writeHead(200);
        response.end();
    }
    response.writeHead(200);
    response.end('hello world');
}).listen(3000);