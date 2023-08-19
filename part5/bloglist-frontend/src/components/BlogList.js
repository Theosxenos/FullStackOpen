import Blog from "./Blog";

const BlogList = ({blogs}) => {

    if(!blogs || blogs.length === 0) {
        return <p>No blogs found</p>;
    }

    return <>
        <h2>blogs</h2>
        {blogs.map((blog) => <Blog key={blog.id} blog={blog}/>)}
    </>;
}

export default BlogList;
