// eslint-disable-next-line import/extensions
import userRepository from '../repositories/UserRepositorySingleton.js';
import UserModel from '../models/UserSchema.js';
import bcrypt from 'bcrypt';

const singleUser = {
    username: 'actionhenk',
    name: 'Action Henk',
    password: 'p455w0rd',
};

const listWithMultipleUsers = [
    {
        username: 'jennifer123',
        password: 'P@ssw0rd!',
        name: 'Jennifer Smith',
    },
    {
        username: 'alexander22',
        password: 'S3cur3P@ss',
        name: 'Alexander Johnson',
    },
    {
        username: 'laura_87',
        password: 'Rainbow#2023',
        name: 'Laura Rodriguez',
    },
    {
        username: 'michael789',
        password: 'Str0ngP@ss',
        name: 'Michael Brown',
    },
    {
        username: 'emily_walker',
        password: 'Sunflower$1',
        name: 'Emily Walker',
    },
    {
        username: 'root',
        name: 'admin',
        password: 'b4d455',
    },
];

const initTestData = async () => {
    await UserModel.deleteMany({});

    const hashedUsers = await Promise.all(listWithMultipleUsers.map(async (user) => {
        const passwordHash = await bcrypt.hash(user.password, 10);
        const { username, name } = user;
        return {
            username,
            name,
            passwordHash,
        };
    }));

    await UserModel.insertMany(hashedUsers);
};


const getAllUsersFromDb = async () => {
    const users = await userRepository.getAllUsers();
    return users.map((u) => u.toJSON());
};

export {
    singleUser, listWithMultipleUsers, initTestData, getAllUsersFromDb,
};
