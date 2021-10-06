const { graphql, buildSchema} = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = { hello: () => 'Hello World!'};

const query = (str) => {
    return new Promise((resolve, reject) => {
        graphql(
            schema,
            str,
            root,
        ).then(response => {
            resolve(response)
            console.log('query--response', response);
        });
    });
}

module.exports = query;