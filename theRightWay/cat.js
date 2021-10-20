#!/usr/bin/env node
'use strict';

require('fs').createReadStream(process.argv[2]).pipe(process.stdout);

/**
 * 第一行代码以#!开头，因此这段程序可以再类Unix系统中直接运行，不必用node来启动它
 * 使用chmod命令给它赋予可执行权限
 * command: chmod +x cat.js
 * 然后直接执行：
 * command: ./cat.js target.txt
 * 
 * 【当然也可以用node执行， command: node cat.js target.txt】
 */