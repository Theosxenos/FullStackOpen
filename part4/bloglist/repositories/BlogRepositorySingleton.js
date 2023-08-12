// eslint-disable-next-line import/extensions
import BlogRepository from './BlogRepository.js';

const BlogRepoSingleton = (() => {
    let instance;

    return {
        getInstance: () => {
            if (!instance) {
                instance = new BlogRepository();
            }

            return instance;
        },
    };
})();

export default BlogRepoSingleton.getInstance();
