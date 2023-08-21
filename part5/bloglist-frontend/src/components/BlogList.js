import Blog from "./Blog";

const BlogList = ({blogs, onBlogUpdate}) => {

    if(!blogs || blogs.length === 0) {
        return <p>No blogs found</p>;
    }

    return <>
        <h2>blogs</h2>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog} onBlogUpdate={(blog) => onBlogUpdate(blog)}/>)}
    </>;
}

export default BlogList;
