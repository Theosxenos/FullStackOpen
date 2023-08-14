/* eslint-disable class-methods-use-this,no-underscore-dangle */
import BlogModel from '../models/BlogSchema.js';
import UserModel from '../models/UserSchema.js';

class BlogRepository {
    async getAllBlogs() {
        return BlogModel.find({})
            .populate('user', { blogs: 0 });
    }

    async addNewBlog(blog) {
        const user = await UserModel.findOne({});
        const userId = blog.userId ? blog.userId : user._id;
        const newBlog = new BlogModel({
            ...blog,
            user: userId,
        });
        if (blog.likes === undefined) {
            newBlog.likes = 0;
        }

        const foundUser = await UserModel.findById(userId);
        foundUser.blogs = [...foundUser.blogs, newBlog._id];
        await foundUser.save();

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
