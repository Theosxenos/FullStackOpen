import { MongoClient, ObjectId } from 'mongodb';
// eslint-disable-next-line import/extensions
import BlogModel from '../models/BlogModel.js';
// eslint-disable-next-line import/extensions
import BlogValidation from '../models/BlogValidation.js';
// eslint-disable-next-line import/extensions
import Logger from '../utils/Logger.js';
// eslint-disable-next-line import/extensions
import MONGODB_DB from '../utils/config.js';

const BlogRepoSingleton = (() => {
    let instance;

    class BlogRepository {
        collectionName = 'blogs';

        async #getCollection() {
            if (!this.collection) {
                await this.connect();
            }

            return this.collection;
        }

        async connect() {
            try {
                this.client = await MongoClient.connect('mongodb://localhost:27017');
                this.db = this.client.db(MONGODB_DB);
                this.collection = this.db.collection(this.collectionName);

                this.db.command({
                    collMod: this.collectionName,
                    validator: BlogValidation.validator,
                });
            } catch (error) {
                Logger.error(error);
            }
        }

        async getAllBlogs() {
            const blogs = await this.collection.find({})
                .toArray();
            return blogs.map((b) => new BlogModel(b));
        }

        addNewBlog(blog) {
            const newBlog = { ...blog };
            if (blog.likes === undefined) {
                newBlog.likes = 0;
            }

            return this.collection.insertOne(newBlog);
        }

        /**
         * @param {string} id
         * @return BlogModel
         */
        async getBlogById(id) {
            const objectId = new ObjectId(id);
            const blogPost = await this.collection.findOne({ _id: objectId });
            return new BlogModel(blogPost);
        }
    }

    return {
        getInsance: () => {
            if (!instance) {
                instance = new BlogRepository();
            }

            return instance;
        },
    };
})();

export default BlogRepoSingleton.getInsance();
