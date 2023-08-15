import BlogModel from '../models/BlogSchema.js';
import UserModel from '../models/UserSchema.js';
import blogRepository from '../repositories/BlogRepositorySingleton.js';
import { initUserTestData } from './userApiTest_helper.js';

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

const getBlogsFromDb = async () => {
    const blogs = await BlogModel.find({});
    return blogs.map((blog) => {
        const blogObj = blog.toJSON();
        blogObj.user = blogObj.user.toString();
        return blogObj;
    });
};

const initBlogTestData = async () => {
    await initUserTestData();
    await BlogModel.deleteMany({});
    const dbUsers = await UserModel.find({});

    await listWithMultipleBlogs.reduce(async (prevPromise, blog) => {
        await prevPromise; // wait for the previous promise to resolve
        const rng = Math.floor(Math.random() * dbUsers.length);

        // eslint-disable-next-line no-await-in-loop
        return blogRepository.addNewBlog({
            ...blog,
            // eslint-disable-next-line no-underscore-dangle
            user: dbUsers[rng]._id.toString(),
        });
    }, Promise.resolve()); // start with a resolved promise
};

export {
    listWithMultipleBlogs,
    singleBlog,
    singleBlogNoLikes,
    singleBlogNoTitle,
    singleBlogNoUrl,
    singleBlogNoUrlTitle,
    getBlogsFromDb,
    initBlogTestData,
};
