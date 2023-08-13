import { agent as supertest } from 'supertest';
// import Supertest from 'supertest';
// eslint-disable-next-line import/extensions
import app from '../app.js';
import {
    listWithMultipleBlogs,
    singleBlog,
    singleBlogNoLikes,
    singleBlogNoTitle,
    singleBlogNoUrl,
    singleBlogNoUrlTitle,
    connectDB,
    getBlogsFromDb,
    initTestData,
// eslint-disable-next-line import/extensions
} from './apiTest_helper.js';
// eslint-disable-next-line import/extensions
import blogRepository from '../repositories/BlogRepositorySingleton.js';

const api = supertest(app);

beforeAll(async () => {
    await connectDB();
});

beforeEach(async () => {
    await initTestData();
});

describe('test saved blogs', () => {
    test('blogs are returned as json with correct amount', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.length)
            .toBe(listWithMultipleBlogs.length);
    });

    test('veryify id property name', async () => {
        const { body } = await api.get('/api/blogs');

        body.forEach((blog) => {
            expect(blog.id)
                .toBeDefined();
            // eslint-disable-next-line no-underscore-dangle
            expect(blog._id)
                .toBeFalsy();
        });
    });
});

describe('test inserting new blogs', () => {
    test('test new blog creation', async () => {
        const response = await api.post('/api/blogs')
            .send(singleBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const newBlogId = response.body.insertedId;
        const allBlogs = await getBlogsFromDb();

        expect(allBlogs.length === listWithMultipleBlogs.length + 1);

        expect(allBlogs)
            .toContainEqual({
                ...singleBlog,
                id: newBlogId,
            });
    });

    test('new blog without likes', async () => {
        const response = await api.post('/api/blogs')
            .send(singleBlogNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const newBlogId = response.body.insertedId;
        const allBlogs = await getBlogsFromDb();

        expect(allBlogs.length === listWithMultipleBlogs.length + 1);

        const foundBlog = allBlogs.find((blog) => blog.id === newBlogId);

        expect(foundBlog.likes)
            .toBe(0);
    });

    test('new blog without title or url', async () => {
        const missingPropBlogsArr = [
            singleBlogNoTitle,
            singleBlogNoUrl,
            singleBlogNoUrlTitle,
        ];

        const promises = missingPropBlogsArr.map(async (blog) => api.post('/api/blogs')
            .send(blog)
            .expect(400));

        await Promise.all(promises);
    });
});

describe('test saved note manipulation', () => {
    test('delete a note', async () => {
        const blogs = await getBlogsFromDb();

        await api.delete(`/api/blogs/${blogs[0].id}`)
            .expect(204);
    });

    test('update a note', async () => {
        let blogs = await getBlogsFromDb();

        const toUpdateBlog = blogs[0];
        toUpdateBlog.likes = 420;

        await api.put(`/api/blogs/${toUpdateBlog.id}`)
            .send(toUpdateBlog)
            .expect(204);

        blogs = await getBlogsFromDb();
        expect(blogs)
            .toContainEqual(toUpdateBlog);
    });
});

afterAll(async () => {
    await blogRepository.client.close();
});
