'use strict';

const fs = require('fs');

fs.writeFile('target.txt', 'i am lucia', err => {
    if (err) {
        throw err;
    }
    console.log('写入完成');
});

// command: node write-simple.js