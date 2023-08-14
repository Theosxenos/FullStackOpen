// eslint-disable-next-line import/extensions
import UserRepository from './UserRepository.js';

const UserRepoSingleton = (() => {
    let instance;

    return {
        getInstance: () => {
            if (!instance) {
                instance = new UserRepository();
            }

            return instance;
        },
    };
})();

export default UserRepoSingleton.getInstance();
