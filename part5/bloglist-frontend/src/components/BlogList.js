import Blog from "./Blog";

const BlogList = ({blogs, onBlogUpdate, onBlogDelete, username}) => {

    if(!blogs || blogs.length === 0) {
        return <p>No blogs found</p>;
    }

    return <>
        <h2>blogs</h2>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} onBlogLike={(blog) => onBlogUpdate(blog)} canDelete={username === blog.user.username} onDelete={(blog) => onBlogDelete(blog)}/>)}
    </>;
}

export default BlogList;
