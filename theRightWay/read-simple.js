'use strict';

const fs = require('fs');
fs.readFile('target.txt', (err, data) => {
    if (err) {
        throw err;
    }
    // data是Buffer对象
    console.log(data.toString());
});

// command: node read-simple.js