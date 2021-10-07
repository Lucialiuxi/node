const { buildSchema } = require('graphql');

const mockData = {
    1: {
        id: 1,
        avatar: 'https://static001.geekbang.org/account/avatar/00/19/19/a0/84f95280.jpg',
        name: 'Junting',
        isTop: true,
        content: '你最帅了～',
        publishDate: '今天',
        commentNum: 10,
        praiseNum: 5
    },
    2: {
        id: 2,
        avatar: 'https://static001.geekbang.org/account/avatar/00/19/19/a0/84f95280.jpg',
        name: 'lucia',
        isTop: true,
        content: '你最美极了～',
        publishDate: '昨天',
        commentNum: 10000,
        praiseNum: 51
    },
    3: {
        id: 1,
        avatar: 'https://static001.geekbang.org/account/avatar/00/19/19/a0/84f95280.jpg',
        name: 'haylee',
        isTop: true,
        content: '你可可爱爱～',
        publishDate: '前天',
        commentNum: 1088,
        praiseNum: 15
    },
};

const schema = buildSchema(`
    type Comment {
        id: ID,
        avatar: String,
        name: String,
        isTop: Boolean,
        content: String,
        commentNum: Int,
        praiseNum: Int,
    }
    type Query {
        comment: [Comment]
    }
    type Mutation {
        praise(id: Int): Int
    }
`);

schema.getQueryType().getFields().comment.resolve = () => {
    
    return Object.keys(mockDatabase).map(key=> {
        return mockDatabase[key];
    })
}
schema.getMutationType().getFields().praise.resolve = (args0, { id }) => {
    mockDatabase[id].praiseNum++;

    return mockDatabase[id].praiseNum
}

module.exports = schema;