// eslint-disable-next-line import/extensions
import logger from './Logger.js';

const unknowEndpointHandler = (request, response) => {
    response.status(404)
        .send({ error: 'unknown endpoint' });
};

const authErrorHandler = (error, request, response, next) => {
    if (error.message === 'invalid username or password' || error.name === 'TokenExpiredError') {
        logger.error(error);
        return response.status(401)
            .send({ error: error.message });
    }

    if (error.name === 'JsonWebTokenError') {
        logger.error(error);
        return response.status(400)
            .send({ error: error.message });
    }

    return next(error);
};

const mongoServerErrorHandler = (error, request, response, next) => {
    if (error.name !== 'MongoServerError') {
        return next(error);
    }

    logger.error(error);

    if (error.code === 11000) {
        return response.status(409)
            .send({ error: error.message });
    }

    return response.status(500)
        .send({ error: 'uknown MongoServer error' });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
    logger.error(error);

    if (error.name === 'ValidationError') {
        return response.status(400)
            .send({ error: error.message });
    }
    if (error.message === 'password missing') {
        return response.status(400)
            .send({ error: error.message });
    }
    if (error.message === 'password too short') {
        return response.status(409)
            .send({ error: error.message });
    }
    // if (error.message === 'blog not found') {
    //     return response.status(404)
    //         .send({ error: error.message });
    // }
    if (error.message === 'database connection problems') {
        return response.status(503)
            .send({ error: error.message });
    }

    return response.status(500)
        .send({ error: 'uknown server error' });
};

export {
    errorHandler, unknowEndpointHandler, mongoServerErrorHandler, authErrorHandler,
};
