const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');

const  { schema, rootComment } = require('./schema');

const app = new Koa();

app.use(
    mount(
        '/api',
         graphqlHTTP({
            schema,
            rootValue: rootComment,
            graphiql: true,
        }),
    ),
);

app.listen(3000);
//  localhost:3000/graphql?query={comment{name,content,praiseNum}}
