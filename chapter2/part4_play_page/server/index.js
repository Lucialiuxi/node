const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');

const app = new Koa();

app.use(
    mount(
        '/api',
         graphqlHTTP({
            schema:  require('./schema'),
        }),
    ),
);

app.listen(4000);
//  localhost:4000/graphql?query={comment{name,content,praiseNum}}
