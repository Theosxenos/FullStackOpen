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

    async getBlogById(id) {
        const blogPost = await BlogModel.findById(id);
        return new BlogModel(blogPost);
    }

    async deleteBlogById(id) {
        return BlogModel.findByIdAndDelete(id);
    }

    async updateBlogById(id, blog) {
        return BlogModel.findByIdAndUpdate(id, blog, { new: true });
    }
}

export default BlogRepository;
