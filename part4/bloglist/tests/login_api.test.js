import { agent as supertest } from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import { initTestData, listWithMultipleUsers } from './userApiTest_helper.js';

const api = supertest(app);

beforeEach(async () => {
    await initTestData();
});

describe('testing authentication', () => {

    test('right credentials', async () => {
        await api.post('/api/login')
            .send(listWithMultipleUsers[0])
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('wrong credentials', async () => {
        const password = 'fakepass';
        const username = 'wronguser';

        await api.post('/api/login')
            .send({
                username,
                password,
            })
            .expect(401);
    });
});

afterAll(async () => {
    // TODO abstract
    await mongoose.connection.close();
});
