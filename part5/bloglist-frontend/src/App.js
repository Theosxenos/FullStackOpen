import {useState, useEffect, useRef} from 'react'
import blogService from './services/blogs'
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import NOTIFICATION_TYPES from "./utils/constants";
import Toggleable from "./components/Toggleable";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState()
    const [notificationData, setNotificationData] = useState();
    const blogForm = useRef();

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

    const handleBlogFormSubmit = async (blog) => {
        try {
            const newBlog = await blogService.addNewBlog(blog);
            setBlogs([...blogs, newBlog]);
            showNotification(`new blog ${newBlog.title} by ${newBlog.author} added`, NOTIFICATION_TYPES.SUCCESS);
            blogForm.current.toggleVisibility();
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
                <Toggleable buttonLabel="new note" ref={blogForm}>
                    <BlogForm onBlogFormSubmit={handleBlogFormSubmit} />
                </Toggleable>
                <BlogList blogs={blogs}/>
            </>}
        </div>
    )
}

export default App
