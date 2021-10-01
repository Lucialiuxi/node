// vm是nodejs的一个模块 -> 虚拟机 -> 是用来运行代码的模块
const vm = require('vm');

const data = {
     greeting: 'hello! lucia !',
     name: 'lucia',
     xss: '<script/>',
};

const templateMap = {
    templateA: '`<div><h2>我是一级模板 我是a</h2>${include("templateB")}</div>`',
    templateB: '`<a>这是子模板b</a>`',
};

// 模板运行的沙箱环境
const sandBox = {
    include: function(name) { // 传入子模板名称
        // 实现子模板
        if (templateMap[name]) return templateMap[name]();
        return '';
    },
    user: data,
    // xss过滤
    _: function (markup) {
        if (!markup) return '';
        return String(markup)
        .replace(/&/g, '&amp')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;')
    },
    helper: function() {
    // 模板helper函数 【???暂时不知道是做什么用的，待探究】
    },
}

// 把templateMap的属性值改为可编译的函数
Object.keys(templateMap).forEach(key => {
    const temp = templateMap[key]; //避免递归调用
    templateMap[key] = vm.runInNewContext(`
        (function() {
            return ${temp};
        });
    `, sandBox);
});


// vm.runInNewContext(code[, sandbox][, options])
console.log(
    vm.runInNewContext(
        '`<section><h2>${_(user.greeting)} ${_(user.xss)}</h2><div>}</div>${include("templateA")}</section>`',
        sandBox,
    )
);


// ejs
// const template = `<h2><%=user.name >%</h2>`;
// ejs.render(template, user);