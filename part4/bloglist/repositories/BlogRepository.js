import { MongoClient, ObjectId } from 'mongodb';
// eslint-disable-next-line import/extensions
import BlogModel from '../models/BlogModel.js';
// eslint-disable-next-line import/extensions
import BlogValidation from '../models/BlogValidation.js';
// eslint-disable-next-line import/extensions
import Logger from '../utils/Logger.js';

class BlogRepository {
    collectionName = 'blogs';

    dbName = 'blogApp';

    constructor() {
        this.initDb();
    }

    async initDb() {
        try {
            this.client = await MongoClient.connect('mongodb://localhost:27017');
            this.db = this.client.db(this.dbName);
            this.collection = this.db.collection(this.collectionName, BlogValidation);
            // this.collection = this.db.createCollection(this.collectionName, BlogValidation);
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
        return this.collection.insertOne(blog);
    }

    /**
     * @param {string} id
     * @return BlogModel
     */
    async getBlogPostById(id) {
        const objectId = new ObjectId(id);
        const blogPost = await this.collection.findOne({ _id: objectId });
        return new BlogModel(blogPost);
    }
}

export default BlogRepository;
