import authService from '../services/AuthService.js';

// eslint-disable-next-line no-unused-vars
const tokenExtractor = (request, response, next) => {
    request.token = authService.getToken(request.get('authorization'));

    next();
};

export default tokenExtractor;
