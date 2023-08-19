import {useState} from "react";
import loginService from '../services/login'
import Notification from "./Notification";
import NOTIFICATION_TYPES from "../utils/constants";

const LoginForm = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        onLogin({username, password})
    }

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <label>username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                /><br/>
                <label>password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                /><br/>
                <button type="submit">login</button>
            </form>
        </div>
    );

}

export default LoginForm;
