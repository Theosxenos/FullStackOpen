import { agent as supertest } from 'supertest';
// import Supertest from 'supertest';
// eslint-disable-next-line import/extensions
import app from '../app.js';
// eslint-disable-next-line import/extensions
import listWithMultipleBlogs from './apiTest_helper.js';
// eslint-disable-next-line import/extensions
import blogRepository from '../repositories/BlogRepository.js';

const api = supertest(app);

beforeEach(async () => {
    await blogRepository.collection.deleteMany({});
    await blogRepository.collection.insertMany(listWithMultipleBlogs);
});

describe('api tests', () => {
    test('blogs are returned as json with correct amount', async () => {
        const response = await api.get('/api/blogs');

        // Check the response status
        expect(response.status)
            .toBe(200);

        // Check the content-type of the response
        expect(response.headers['content-type'])
            .toMatch(/application\/json/);

        // Check the length of the response body
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

afterAll(async () => {
    await blogRepository.client.close();
});
