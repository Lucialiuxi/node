'use strict';

const { EventEmitter } = require('events');

class LDJClient extends EventEmitter {
    constructor(stream) {
        super();

        let buffer = '';

        stream.on('data', data => {
            buffer += data;
            let bundary = buffer.indexOf('\n');

            while(bundary !== -1) {
                const input = buffer.substring(0, bundary); // \n 之前的部分
                buffer = buffer.substring(bundary + 1 ); // \n 之后的部分
                console.log('input---', input);
                this.emit('message', JSON.parse(input));
                bundary = buffer.indexOf('\n');
            }
        });
    };

    static connect(stream) {
        return new LDJClient(stream);
    };
};

module.exports = LDJClient;