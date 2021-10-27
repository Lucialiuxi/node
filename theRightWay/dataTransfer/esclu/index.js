#!/usr/bin/env node
'use strict';
// 创建索引储存图书元数据
const fullUrl = (path = '') => {
    let url = `http://${program._optionValues.host}:${program._optionValues.port}`;
    console.log('url---', url)
    console.log('path---', path)
    if (program.index) {
        url += program.index + '/';
        if (program.type) {
            url += program.type + '/';
        }
    }
    return url + path;
};



// ---命令行程序---------
const fs = require('fs');
const request = require('request');
const program = require('commander');
const pkg = require('./package.json');
const path = require('path');

program.version(pkg.version)
.description(pkg.description)
.usage('[option] <command> [...]')
.option('-o, --host <hostname>', 'hostname [localhost]', 'localhost')
.option('-p, --port <number>', 'port number [9200]', '9200')
.option('-j, --json', '将输出格式转换为JSON')
.option('-i, --index <name>', '使用的index')
.option('-t, --type <type>','批量操作的默认类型');

program
.command('url [path]')
.description('为选项和路径生成URl（默认值为/）')
.action((path = '/') => console.log(fullUrl(path)));

program.parse(process.argv);

if(!program.args.length) {
    program.help();
}