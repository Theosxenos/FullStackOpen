import AuthService from '../services/AuthService.js';
import userRepository from '../repositories/UserRepositorySingleton.js';
import { listWithMultipleUsers } from './userApiTest_helper.js';

const authenticateTestUser = async (username, password) => AuthService.login(username, password);

const authenticateTestUserById = async (id) => {
    const { username } = await userRepository.getUserById(id);
    const { password } = listWithMultipleUsers.find((u) => u.username === username);

    return authenticateTestUser(username, password);
};

export { authenticateTestUser, authenticateTestUserById };
