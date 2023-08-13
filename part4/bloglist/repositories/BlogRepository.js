/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/extensions
import BlogModel from '../models/BlogSchema.js';
// eslint-disable-next-line import/extensions
import MONGODB_DB from '../utils/config.js';
import mongoose from 'mongoose';

class BlogRepository {
    collectionName = 'blogs';

    async connect() {
        if (mongoose.connection.closed || mongoose.connection.closed === undefined) {
            await mongoose.connect(`mongodb://localhost:27017/${MONGODB_DB}`);
        }
    }

    async getAllBlogs() {
        return BlogModel.find({});
    }

    async addNewBlog(blog) {
        const newBlog = new BlogModel({ ...blog });
        if (blog.likes === undefined) {
            newBlog.likes = 0;
        }

        return newBlog.save();
    }

    // /**
    //  * @param {string} id
    //  * @return BlogModel
    //  */
    // async getBlogById(id) {
    //     const objectId = new ObjectId(id);
    //     const blogPost = await this.collection.findOne({ _id: objectId });
    //     return new BlogModel(blogPost);
    // }
    //
    // async deleteBlogById(id) {
    //     const objectId = new ObjectId(id);
    //     const result = await this.collection.deleteOne({ _id: objectId });
    //     return result.deletedCount;
    // }
    //
    // async updateBlogById(id, blog) {
    //     const objectId = new ObjectId(id);
    //     const toUpdateBlog = { ...blog };
    //
    //     delete toUpdateBlog.id;
    //     // eslint-disable-next-line no-underscore-dangle
    //     toUpdateBlog._id = objectId;
    //
    //     const result = await this.collection.updateOne({ _id: objectId }, { $set: toUpdateBlog });
    //     return result.modifiedCount;
    // }
}

export default BlogRepository;
