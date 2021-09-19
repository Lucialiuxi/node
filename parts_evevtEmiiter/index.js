const EventEmitter = require('events').EventEmitter;

class GeekTime extends EventEmitter {
    constructor(){
        super();
        setInterval(() => {
            this.emit('haveNewLesson', {
                price: Math.random()*100,
            })
        }, 3000);
    }
}

const myNotice = new GeekTime;

myNotice.addListener('haveNewLesson', res => {
    if (res.price < 60) {
        console.log('买它', res.price)
    } else {
        console.log('太贵啦')
    }
});