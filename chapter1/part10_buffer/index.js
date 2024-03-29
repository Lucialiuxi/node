const fs = require('fs');
const protobuf = require('protocol-buffers');

const messages = protobuf(fs.readFileSync(__dirname + '/shema.proto', 'utf-8'));

const obj = {
    num: 30.4,
    payload: '123',
    id: 1
};

const buf = messages.Test.encode(obj);

console.log(buf); // 编码后

const debuf = messages.Test.decode(buf);

console.log(debuf); // 解码后【num浮点数会有精度问题存在】