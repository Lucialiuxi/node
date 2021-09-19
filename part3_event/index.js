const myNotice = require('./lib');

myNotice.addListener('haveNewLesson', res => {
    if (res.price < 60) {
        console.log('买它', res.price)
    } else {
        console.log('太贵啦')
    }
});