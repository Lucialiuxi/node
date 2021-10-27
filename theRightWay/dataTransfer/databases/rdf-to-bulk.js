// 用node-dir模块 便利所有RDF文件

'use strict';

const dir = require('node-dir');
const parseRDF = require('./lib/parse-rdf.js');

const dirname = process.argv[2];

const options = {
    match: /\.rdf$/, // 匹配文件后缀是.rdf的文件
    exclude: ['pg0.rdf'], // 忽略RDF文件ID是0的
};

dir.readFiles(dirname, options, (err, content, next) => {
    if (err) throw err;
    const doc = parseRDF(content);
    console.log(doc);
    next();
});

process.stdout.on('error', err => {
    if(err.code === 'EPIPE') {
        process.exit();
    }
    throw err;
});
/**
 command:
    node rdf-to-bulk.js ../data/cache/epub/ > ../data/bulk_pg.ldj
 */