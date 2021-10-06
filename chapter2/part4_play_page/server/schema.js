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

const rootComment = {
    comment: () => Object.keys(mockData).map(key => mockData[key]),
    praise: (id) => {  
        mockData[id].praiseNum++;
        return mockData[id].praiseNum;
    },
};

// 等同于 rootComment的comment
// schema.getQueryType().getFields().comment.resolve = () => {
//     return Object.keys(mockData).map(key => mockData[key]);
// }


module.exports = { schema, rootComment };
