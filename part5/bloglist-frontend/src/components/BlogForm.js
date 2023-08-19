const BlogForm = ({onBlogFormSubmit}) => {
    return <div>
        <form onSubmit={onBlogFormSubmit}>
            <label>title</label><input type="text" id="title"/><br/>
            <label>author</label><input type="text" id="author"/><br/>
            <label>url</label><input type="text" id="url"/><br/>
            <button type="submit">create</button>
        </form>
    </div>
}

export default BlogForm;
