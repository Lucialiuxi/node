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

module.exports = new GeekTime;