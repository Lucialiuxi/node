// Mocha 会自动再test目录下查找测试代码
'use strict';

const assert = require('assert');

const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib//lbj-client.js');


describe('LDJClient', () => {
    let stream = null;
    let client = null;

    beforeEach(() => {
        stream = new EventEmitter();
        client = new LDJClient(stream);
    });

    it ('should emit a message event form a single data event', function(done) {
        client.on('message', message => {
            assert.deepEqual(message, { foo: 'bar' });
        });

        stream.emit('data', '{"foo": "bar"}');
        done();
    });
});