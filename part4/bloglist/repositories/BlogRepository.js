/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/extensions
import BlogModel from '../models/BlogSchema.js';

class BlogRepository {
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
