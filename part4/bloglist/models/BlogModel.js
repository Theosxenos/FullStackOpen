class BlogModel {
    constructor(blog) {
        // eslint-disable-next-line no-underscore-dangle
        this.id = blog._id.toString();
        this.title = blog.title;
        this.author = blog.author;
        this.url = blog.url;
        this.likes = blog.likes;
    }
}

export default BlogModel;
