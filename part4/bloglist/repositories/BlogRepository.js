import { MongoClient, ObjectId } from 'mongodb';
// eslint-disable-next-line import/extensions
import BlogModel from '../models/BlogModel.js';
// eslint-disable-next-line import/extensions
import BlogValidation from '../models/BlogValidation.js';
// eslint-disable-next-line import/extensions
import Logger from '../utils/Logger.js';
// eslint-disable-next-line import/extensions
import MONGODB_DB from '../utils/config.js';

class BlogRepository {
    collectionName = 'blogs';

    async connect() {
        this.client = await MongoClient.connect('mongodb://localhost:27017');
        this.db = this.client.db(MONGODB_DB);
        this.collection = this.db.collection(this.collectionName);

        this.db.command({
            collMod: this.collectionName,
            validator: BlogValidation.validator,
        });
    }

    async getAllBlogs() {
        const blogs = await this.collection.find({})
            .toArray();
        return blogs.map((b) => new BlogModel(b));
    }

    async addNewBlog(blog) {
        const newBlog = { ...blog };
        if (blog.likes === undefined) {
            newBlog.likes = 0;
        }

        if (blog.title === undefined || blog.url === undefined) {
            throw new Error('properties missing');
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

    async deleteBlogById(id) {
        const objectId = new ObjectId(id);
        const result = await this.collection.deleteOne({ _id: objectId });
        return result.deletedCount;
    }

    async updateBlogById(id, blog) {
        const objectId = new ObjectId(id);
        const toUpdateBlog = { ...blog };

        delete toUpdateBlog.id;
        // eslint-disable-next-line no-underscore-dangle
        toUpdateBlog._id = objectId;

        const result = await this.collection.updateOne({ _id: objectId }, { $set: toUpdateBlog });
        return result.modifiedCount;
    }
}

export default BlogRepository;
