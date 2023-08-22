import axios from 'axios';

const login = async (credentials) => axios.post('/api/login', credentials);

export default { login };
