import {useState, useEffect} from 'react'
import blogService from './services/blogs'
import LoginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState()

    const handleLogout = () => {
        window.localStorage.clear();
        setUser(undefined);
        blogService.setToken('');
    }

    const handleBlogFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const {title, author, url} = event.target.elements

            const newBlog = {
                title: title.value,
                author: author.value,
                url: url.value
            }

            const blog = await blogService.addNewBlog(newBlog);
            setBlogs([...blogs, blog]);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const {username, password} = event.target.elements

            const {data} = await LoginService.login({username: username.value, password: password.value});
            setUser(data);

            blogService.setToken(data.token);
            window.localStorage.setItem('loggedUser', JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!user) return;

        (async () => {
            setBlogs(await blogService.getAll());
        })();
    }, [user]);

    useEffect(() => {
        const storedUser = window.localStorage.getItem('loggedUser');

        if(storedUser && !user) {
            const userJson = JSON.parse(storedUser);
            setUser(userJson);
            blogService.setToken(userJson.token);
        }
    }, []);

    return (
        <div>
            {!user && <LoginForm onFormSubmit={handleLoginFormSubmit}/>}
            {user && <>
                <p>Welcome {user.name}! <button type="button" onClick={handleLogout}>logout</button></p>
                <BlogForm onBlogFormSubmit={handleBlogFormSubmit} />
                <BlogList blogs={blogs}/>
            </>}
        </div>
    )
}

export default App
