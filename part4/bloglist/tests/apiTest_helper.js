import blogRepository from '../repositories/BlogRepositorySingleton.js';

const listWithMultipleBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    },
    {
        title: 'Lorem Ipsum',
        author: 'Augustinus',
        url: 'https://example.com',
        likes: 13,
    },
];

const singleBlog = {
    title: 'Lorem Ipsum',
    author: 'Cicero',
    url: 'https://example.com',
    likes: 13,
};

const singleBlogNoLikes = {
    title: 'Dolor sit amet',
    author: 'Cicero',
    url: 'https://example.com',
};

const singleBlogNoTitle = {
    author: 'Cicero',
    url: 'https://example.com',
    likes: 13,
};

const singleBlogNoUrl = {
    title: 'Consectetur adipiscing elit',
    author: 'Cicero',
    likes: 13,
};

const singleBlogNoUrlTitle = {
    author: 'Cicero',
    likes: 13,
};

const getBlogsFromDb = () => blogRepository.getAllBlogs();

export {
    listWithMultipleBlogs,
    singleBlog,
    singleBlogNoLikes,
    singleBlogNoTitle,
    singleBlogNoUrl,
    singleBlogNoUrlTitle,
    getBlogsFromDb,
};
