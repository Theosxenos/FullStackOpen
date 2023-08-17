import {useState, useEffect} from 'react'
import blogService from './services/blogs'
import LoginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState()

    const handleLogout = () => {
        window.localStorage.clear();
        setUser(undefined);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const {username, password} = event.target.elements

            const {data} = await LoginService.login({username: username.value, password: password.value});
            setUser(data);

            window.localStorage.setItem('loggedUser', JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!user) return;

        blogService.getAll().then(blogs => setBlogs(blogs));
    }, [user]);

    useEffect(() => {
        const storedUser = window.localStorage.getItem('loggedUser');

        if(storedUser) {
            const userJson = JSON.parse(storedUser);
            setUser(userJson);
        }
    }, []);


    return (
        <div>
            {!user && <LoginForm onFormSubmit={handleSubmit}/>}
            {user && <>
                <p>Welcome {user.name}! <button type="button" onClick={handleLogout}>logout</button></p>
                <BlogList blogs={blogs}/>
            </>}
        </div>
    )
}

export default App
