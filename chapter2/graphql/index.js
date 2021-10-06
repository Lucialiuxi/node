const query = require('./hello');

query('{hello}').then(res => {
    console.log('res',res);
});