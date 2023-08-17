import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';
import mongoose from 'mongoose';
// eslint-disable-next-line import/extensions
import blogsRouter from './controllers/blogsRouter.js';
// eslint-disable-next-line import/extensions
import {
    authErrorHandler,
    errorHandler,
    mongoServerErrorHandler,
    unknowEndpointHandler,
} from './utils/errorMiddleware.js';
// eslint-disable-next-line import/extensions
import usersRouter from './controllers/usersRouter.js';
// eslint-disable-next-line import/extensions
import MONGODB_DB from './utils/config.js';
import loginRouter from './controllers/loginRouter.js';
import { tokenExtractor, userExtractor } from './utils/authMiddleware.js';
import blogRepository from './repositories/BlogRepositorySingleton.js';

const app = express();

app.use(express.json());
app.use(cors());

morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));
// app.use(morgan('tiny'));

if (mongoose.connection.closed || mongoose.connection.closed === undefined) {
    await mongoose.connect(`mongodb://localhost:27017/${MONGODB_DB}`);
}

app.get('/api/blogs/', async (request, response) => {
    response.json(await blogRepository.getAllBlogs());
});
app.use('/api/blogs', tokenExtractor, userExtractor, blogsRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

app.use(unknowEndpointHandler);
app.use(authErrorHandler);
app.use(mongoServerErrorHandler);
app.use(errorHandler);

export default app;
