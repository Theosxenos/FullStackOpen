import { Router } from 'express';
import AuthService from '../services/AuthService.js';

const loginRouter = new Router();

loginRouter.post('/', async (request, response) => {
    const {
        username,
        password,
    } = request.body;

    const authResult = await AuthService.login(username, password);

    response.status(200)
        .send(authResult);
});

export default loginRouter;
