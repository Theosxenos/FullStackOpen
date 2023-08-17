import { agent as supertest } from 'supertest';
import mongoose from 'mongoose';
// eslint-disable-next-line import/extensions
import app from '../app.js';
import {
    getBlogsFromDb, getSingleBlogFromDb,
    initBlogTestData,
    listWithMultipleBlogs,
    singleBlog,
    singleBlogNoLikes,
    singleBlogNoTitle,
    singleBlogNoUrl,
    singleBlogNoUrlTitle,
} from './blogApiTest_helper.js';
import { authenticateTestUser, authenticateTestUserById } from './authApiTest_helper.js';

const api = supertest(app);

beforeEach(async () => {
    await initBlogTestData();
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
    beforeEach(async () => {
        api.set(await authenticateTestUser());
    });

    test('test new blog creation', async () => {
        const response = await api.post('/api/blogs')
            .send(singleBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const allBlogs = await getBlogsFromDb();

        expect(allBlogs.length)
            .toBe(listWithMultipleBlogs.length + 1);
        expect(allBlogs)
            .toContainEqual(response.body);
    });

    test('new blog without likes', async () => {
        const response = await api.post('/api/blogs')
            .send(singleBlogNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        expect(response.body.likes)
            .toBe(0);

        const allBlogs = await getBlogsFromDb();
        expect(allBlogs.length)
            .toBe(listWithMultipleBlogs.length + 1);
    });

    test('new blog without title or url', async () => {
        const missingPropBlogsArr = [
            singleBlogNoTitle,
            singleBlogNoUrl,
            singleBlogNoUrlTitle,
        ];

        await missingPropBlogsArr.reduce(async (prevPromise, blog) => {
            await prevPromise; // wait for the previous promise to resolve

            return api.post('/api/blogs')
                .send(blog)
                .expect(400);
        }, Promise.resolve()); // start with a resolved promise
    });
});

describe('test saved note manipulation', () => {
    test('delete a note', async () => {
        const blog = await getSingleBlogFromDb();

        api.set(await authenticateTestUserById(blog.user.toString()));

        await api.delete(`/api/blogs/${blog.id}`)
            .expect(204);
    });

    test('delete a non existing note', async () => {
        // eslint-disable-next-line max-len
        // TODO map all IDs? Generate list through ChatGpt en then check for one that is not in the other list
        api.set(await authenticateTestUser());

        await api.delete('/api/blogs/64c5197b18fedff391340b90')
            .expect(404);
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

describe('test as unauthorized', () => {
    test('insert new blog', async () => {
        await api.post('/api/blogs')
            .send(singleBlog)
            .expect(401);

        const allBlogs = await getBlogsFromDb();

        expect(allBlogs.length)
            .toBe(listWithMultipleBlogs.length);
    });
});

afterAll(async () => {
    // TODO abstract
    await mongoose.connection.close();
});
