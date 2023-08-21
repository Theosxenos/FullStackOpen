import {useState} from "react";

const Blog = ({blog, onBlogUpdate}) => {
    const [visibleDetails, setVisibleDetails] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleButtonText = visibleDetails ? 'hide' : 'show';
    const visibilityStyle = visibleDetails ? {display: 'block'} : {display: 'none'};

    const handleLike = () => onBlogUpdate({...blog, likes: blog.likes + 1})

    return (
        <div style={blogStyle}>
            <p>{blog.title} - {blog.author} <button type="button" onClick={() => setVisibleDetails(!visibleDetails)}>{toggleButtonText}</button></p>
            <div style={visibilityStyle}>
                <p>{blog.url}</p>
                <p>likes: {blog.likes} <button type="button" onClick={handleLike}>like</button></p>
                <p>{blog.user.name}</p>
            </div>
        </div>
    );
}

export default Blog
