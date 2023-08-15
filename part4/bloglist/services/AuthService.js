import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepositorySingleton.js';

class AuthService {
    static async login(username, password) {
        const user = await userRepository.findUser({ username });
        const isPasswordCorrect = user ? await bcrypt.compare(password, user.passwordHash) : false;

        if (!(isPasswordCorrect && user)) {
            throw new Error('invalid username or password');
        }

        const userForToken = {
            username: user.username,
            // eslint-disable-next-line no-underscore-dangle
            id: user._id,
        };

        const token = jwt.sign(userForToken, process.env.SECRET);

        return {
            token,
            username: user.username,
            name: user.name,
        };
    }
}

export default AuthService;
