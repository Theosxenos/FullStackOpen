import express from 'express';
import cors from 'cors';
// eslint-disable-next-line import/extensions
import blogsRouter from './controllers/blogsRouter.js';
// eslint-disable-next-line import/extensions
import Logger from './utils/Logger.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/blogs', blogsRouter);

// Unknown endpoint handler
app.use((request, response) => {
    response.status(404)
        .send({ error: 'unknown endpoint' });
});

app.use((request, response, next, error) => {
    Logger.error(error);
});

export default app;
