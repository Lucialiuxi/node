'use strict';


const server = require('net').createServer(connection => {
    console.log('subscriber connected');
    const date = new Date().getTime();
    // two message chunks that together make a whole message.
    const firstChunk = '{"type":"changed", "timesta';
    const secondChunk = `mp":"${date}"}\n`;

    // send the first chunk immediately
    connection.write(firstChunk);
    
    // after a short delay, send the other chunk
    const timer = setTimeout(() => {
        connection.write(secondChunk);
        connection.end();
    }, 100);

    // clear timer when the connection ends.
    connection.on('end', () => {
        clearTimeout(timer);
        console.log('subscriber disconnected');
    });

});
server.listen(4000, () => {
    console.log('监听端口：4000');
});
/**command: [都在WSL终端执行]

    node test-json-service.js

    node net-watcher-json-client.js

 */