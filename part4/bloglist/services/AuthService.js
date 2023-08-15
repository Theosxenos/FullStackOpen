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

        const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

        return {
            token,
            username: user.username,
            name: user.name,
        };
    }

    static getToken(authorization) {
        if (!(authorization && authorization.startsWith('Bearer '))) {
            return null;
        }

        return authorization.replace('Bearer ', '');
    }

    static decodeToken(encodedToken) {
        return jwt.verify(encodedToken, process.env.SECRET);
    }
}

export default AuthService;
