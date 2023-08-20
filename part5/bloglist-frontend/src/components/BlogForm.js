import {useState} from "react";

const BlogForm = ({onBlogFormSubmit}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        onBlogFormSubmit({title, author, url});

        setTitle('');
        setAuthor('');
        setUrl('');
    }

    return <div>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
            <label>title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value) }/>
            <br/>

            <label>author</label>
            <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value) }/>
            <br/>

            <label>url</label>
            <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value) }/>
            <br/>

            <button type="submit">create</button>
        </form>
    </div>
}

export default BlogForm;
