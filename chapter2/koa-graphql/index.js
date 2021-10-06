const koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const {
    schema,
    rootComment,
} = require('./schema');

const app = new koa();

app.use(
    mount(
        '/graphql', 
        graphqlHTTP({
            schema,
            rootValue: rootComment,
        }),
    ),
);


app.listen(3003); // localhost:3003/graphql?query={comment{name}}