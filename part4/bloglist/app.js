import express from 'express';
import cors from 'cors';
import 'express-async-errors';
// eslint-disable-next-line import/extensions
import blogsRouter from './controllers/blogsRouter.js';
// eslint-disable-next-line import/extensions
import logger from './utils/Logger.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/blogs', blogsRouter);

// Unknown endpoint handler
app.use((request, response) => {
    response.status(404)
        .send({ error: 'unknown endpoint' });
});

app.use((error, request, response, next) => {
    logger.error(error);

    if (error.message === 'properties missing') {
        response.status(400)
            .send({ error: error.message });
    }
    if (error.message === 'blog not found') {
        response.status(404)
            .send({ error: error.message });
    }

    response.status(500)
        .send({ error: 'uknown server error' });
});

export default app;
