const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');


const app = new koa();

// 遇到匹配路径使用static的文件
app.use(static(__dirname + '/source/'));

// 挂载中间件 
app.use(
    mount('/', async (ctx) => {
        ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
    })
);

app.listen(3006);