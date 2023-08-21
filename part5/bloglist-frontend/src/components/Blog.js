import {useState} from "react";

const Blog = ({blog}) => {
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

    return (
        <div style={blogStyle}>
            <p>{blog.title} - {blog.author} <button type="button" onClick={() => setVisibleDetails(!visibleDetails)}>{toggleButtonText}</button></p>
            <div style={visibilityStyle}>
                <p>{blog.url}</p>
                <p>likes: {blog.likes} <button type="button">like</button> </p>
                <p>{blog.user.name}</p>
            </div>
        </div>
    );
}

export default Blog
