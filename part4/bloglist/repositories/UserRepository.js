/* eslint-disable class-methods-use-this */
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/extensions
import UserModel from '../models/UserSchema.js';

class UserRepository {
    async getAllUsers() {
        return UserModel.find({});
    }

    async addNewUser(user) {
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

    // async getUserById(id) {
    //     const userPost = await UserModel.findById(id);
    //     return new UserModel(userPost);
    // }
    //
    // async deleteUserById(id) {
    //     return UserModel.findByIdAndDelete(id);
    // }
    //
    // async updateUserById(id, user) {
    //     return UserModel.findByIdAndUpdate(id, user, { new: true });
    // }
}

export default UserRepository;
