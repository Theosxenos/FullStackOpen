import authService from '../services/AuthService.js';

// eslint-disable-next-line no-unused-vars
const tokenExtractor = (request, response, next) => {
    request.token = authService.getToken(request.get('authorization'));

    next();
};

const userExtractor = (request, response, next) => {
    // const encodedToken = authService.getToken(request.get('authorization'));
    const decodedToken = authService.decodeToken(request.token);

    request.user = decodedToken.id;

    next();
};

export { tokenExtractor, userExtractor };
