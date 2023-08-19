import {useState, useEffect} from 'react'
import blogService from './services/blogs'
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import NOTIFICATION_TYPES from "./utils/constants";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState()
    const [notificationData, setNotificationData] = useState();

    const handleLogout = () => {
        window.localStorage.clear();
        setUser(undefined);
        blogService.setToken('');
    }

    const showNotification = (message, type) => {
        setNotificationData({
            message,
            type
        });

        setTimeout(() => setNotificationData(undefined), 5_000);
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
            showNotification(`new blog ${blog.name} by ${blog.author} added`, NOTIFICATION_TYPES.SUCCESS);

        } catch (error) {
            console.error(error);
            showNotification(error.message, NOTIFICATION_TYPES.DANGER);
        }
    }

    const handleLogin = async (credentials) => {
        try {
            const {data} = await loginService.login(credentials);

            setUser(data);
            window.localStorage.setItem('loggedUser', JSON.stringify(data));
            blogService.setToken(data.token);
        } catch (error) {
            console.error(error);
            if(error.response && error.response.status === 401) {
                showNotification('invalid username or password', NOTIFICATION_TYPES.DANGER);
            }
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
            <h1>blogapp</h1>
            {notificationData && <Notification notificationData={notificationData} />}
            {!user && <LoginForm onLogin={handleLogin}/>}
            {user && <>
                <p>Welcome {user.name}! <button type="button" onClick={handleLogout}>logout</button></p>
                <BlogForm onBlogFormSubmit={handleBlogFormSubmit} />
                <BlogList blogs={blogs}/>
            </>}
        </div>
    )
}

export default App
