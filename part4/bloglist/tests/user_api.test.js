import { agent as supertest } from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import {
    getAllUsersFromDb,
    initUserTestData,
    listWithMultipleUsers,
    singleUser,
} from './userApiTest_helper.js';
import authService from '../services/AuthService.js';

const api = supertest(app);

beforeEach(async () => {
    await initUserTestData();
});

describe('creating new users', () => {
    test('insert new user', async () => {
        const response = await api.post('/api/users')
            .send(singleUser)
            .expect(201);

        const dbUsers = await getAllUsersFromDb();

        expect(dbUsers.length)
            .toBe(listWithMultipleUsers.length + 1);
        expect(dbUsers)
            .toContainEqual(response.body);
        expect(response.body)
            .not
            .toContain('passwordHash');
    });

    test('insert existing user', async () => {
        const response = await api.post('/api/users')
            .send(listWithMultipleUsers[0])
            .expect(409);

        const dbUsers = await getAllUsersFromDb();

        expect(dbUsers.length)
            .toBe(listWithMultipleUsers.length);
        expect(dbUsers)
            .not
            .toContainEqual(response.body);
    });

    test('insert user with short username', async () => {
        const response = await api.post('/api/users')
            .send({
                name: 'Marcus Aurelius',
                username: 'ma',
                password: 'meditations',
            })
            .expect(400);

        const dbUsers = await getAllUsersFromDb();

        expect(dbUsers.length)
            .toBe(listWithMultipleUsers.length);
        expect(dbUsers)
            .not
            .toContainEqual(response.body);
    });
});

describe('testing password', () => {
    test('missing password', async () => {
        const response = await api.post('/api/users')
            .send({
                name: 'Julius Caesar',
                username: 'imperator',
            })
            .expect(400);

        const dbUsers = await getAllUsersFromDb();

        expect(dbUsers.length)
            .toBe(listWithMultipleUsers.length);
        expect(dbUsers)
            .not
            .toContainEqual(response.body);
    });

    test('short password', async () => {
        const response = await api.post('/api/users')
            .send({
                name: 'Julius Caesar',
                username: 'imperator',
                password: '12',
            })
            .expect(409);

        const dbUsers = await getAllUsersFromDb();

        expect(dbUsers.length)
            .toBe(listWithMultipleUsers.length);
        expect(dbUsers)
            .not
            .toContainEqual(response.body);
    });
});

describe('testing existing data', () => {
    test('get all users', async () => {
        const {
            username,
            password,
        } = listWithMultipleUsers[0];
        const auth = await authService.login(username, password);

        const response = await api.get('/api/users')
            .set('Authorization', `Bearer ${auth.token}`) // Setting the token as a Bearer token
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.length)
            .toBe(listWithMultipleUsers.length);
    });
});

afterAll(async () => {
    // TODO abstract
    await mongoose.connection.close();
});
