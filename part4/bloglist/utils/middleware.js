// eslint-disable-next-line import/extensions
import logger from './Logger.js';

const unknowEndpointHandler = (request, response) => {
    response.status(404)
        .send({ error: 'unknown endpoint' });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
    logger.error(error);

    if (error.name === 'ValidationError') {
        response.status(400)
            .send({ error: error.message });
    }
    if (error.message === 'blog not found') {
        response.status(404)
            .send({ error: error.message });
    }
    if (error.message === 'database connection problems') {
        response.status(503)
            .send({ error: error.message });
    }

    response.status(500)
        .send({ error: 'uknown server error' });
};

export { errorHandler, unknowEndpointHandler };