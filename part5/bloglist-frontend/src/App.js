import {useState, useEffect} from 'react'
import blogService from './services/blogs'
import LoginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const {username, password} = event.target.elements

        const {data} = await LoginService.login({username: username.value, password: password.value});
        setUser(data);
    }

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    return (
        <>
            {!user && <LoginForm onFormSubmit={handleSubmit}/>}
            {user && <>
                <p>Welcome {user.name}!</p>
                <BlogList blogs={blogs}/>
            </>}
        </>
    )
}

export default App
