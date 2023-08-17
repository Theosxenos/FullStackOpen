import AuthService from '../services/AuthService.js';
import userRepository from '../repositories/UserRepositorySingleton.js';
import { listWithMultipleUsers } from './userApiTest_helper.js';

const authHeaderFactory = (token) => ({ Authorization: `Bearer ${token}` });

const authenticateTestUser = async () => {
    const {
        username,
        password,
    } = listWithMultipleUsers[0];
    const { token } = await AuthService.login(username, password);

    return authHeaderFactory(token);
};

const authenticateTestUserById = async (id) => {
    const { username } = await userRepository.getUserById(id);
    const { password } = listWithMultipleUsers.find((u) => u.username === username);
    const { token } = await AuthService.login(username, password);

    return authHeaderFactory(token);
};

export { authenticateTestUser, authenticateTestUserById };
