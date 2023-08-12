import { agent as supertest } from 'supertest';
// import Supertest from 'supertest';
// eslint-disable-next-line import/extensions
import app from '../app.js';
// eslint-disable-next-line import/extensions
import { listWithMultipleBlogs, singleBlog, singleBlogNoLikes } from './apiTest_helper.js';
// eslint-disable-next-line import/extensions
import blogRepository from '../repositories/BlogRepository.js';

const api = supertest(app);

beforeEach(async () => {
    await blogRepository.collection.deleteMany({});
    await blogRepository.collection.insertMany(listWithMultipleBlogs);
});

describe('api tests', () => {
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

    test('test new blog creation', async () => {
        const response = await api.post('/api/blogs')
            .send(singleBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const newBlogId = response.body.insertedId;
        const allBlogs = await api.get('/api/blogs');

        expect(allBlogs.body.length === listWithMultipleBlogs.length + 1);

        const foundBlog = allBlogs.body.find((blog) => blog.id === newBlogId);

        expect(foundBlog)
            .toEqual({
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
        const allBlogs = await api.get('/api/blogs');

        expect(allBlogs.body.length === listWithMultipleBlogs.length + 1);

        const foundBlog = allBlogs.body.find((blog) => blog.id === newBlogId);

        expect(foundBlog.likes)
            .toBe(0);
    });
});

afterAll(async () => {
    await blogRepository.client.close();
});
