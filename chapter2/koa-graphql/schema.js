const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Comment {
    id: ID,
    avatar: String,
    name: String,
    isTop: Boolean,
    content: String,
    publishDate: String,
    commmentNum: Int,
    praiseNum: Int,
}
type Query {
    comment: [ Comment]
}
`);

const rootComment = {
    comment: () => {
        return [
            {
                id: 1,
                avatar: 'https://static001.geekbang.org/account/avatar/00/19/19/a0/84f95280.jpg',
                name: 'Junting',
                isTop: true,
                content: '你最帅了～',
                publishDate: '今天',
                commentNum: 10,
                praiseNum: 5
            },
        ];
    },
};


module.exports = {
    schema,
    rootComment,
};