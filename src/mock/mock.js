import Mock from 'mockjs'; // 引入 mockjs

// 随机生成新闻列表数据
let newsList = Mock.mock({
    'data|20': [
        {
            id: '@id',
            title: '@cparagraph(1, 3)',
            date: '@date("yyyy-MM-dd")',
            imageURL: Mock.Random.image('200x200', '#fff', '#333', 'Mock.js'),
            viewCount: '@integer(10, 10000)'
        },
    ],
})

export default [
    Mock.mock('/newslist', newsList), // 新闻列表数据接口
    Mock.mock(RegExp(/\/newsDetail\?id=.*/), 'get', Mock.mock({'data': "asdafsasda"})), // 新闻列表数据接口
];