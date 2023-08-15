/* eslint-disable class-methods-use-this */
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/extensions
import UserModel from '../models/UserSchema.js';

class UserRepository {
    async getAllUsers() {
        return UserModel.find({})
            .populate('blogs', {
                likes: 0,
                user: 0,
            });
    }

    // TODO abstract partially to AuthService
    async addNewUser(user) {
        if (!user.password) {
            throw new Error('password missing');
        }
        if (user.password.length < 3) {
            throw new Error('password too short');
        }

        const {
            username,
            name,
        } = { ...user };
        const passwordHash = await bcrypt.hash(user.password, 10);

        const newUser = new UserModel({
            username,
            name,
            passwordHash,
        });
        return newUser.save();
    }

    async findUser(searchTerms) {
        return UserModel.findOne(searchTerms);
    }

    // async getUserById(id) {
    //     return UserModel.findById(id);
    // }

    // async deleteUserById(id) {
    //     return UserModel.findByIdAndDelete(id);
    // }
    //
    // async updateUserById(id, user) {
    //     return UserModel.findByIdAndUpdate(id, user, { new: true });
    // }
}

export default UserRepository;
