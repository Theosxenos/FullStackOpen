import axios from "axios";

const login = async (credentials) => {
    return axios.post('/api/login', credentials);
}

export default { login }
