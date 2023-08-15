import express from 'express';
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
} from './utils/middleware.js';
// eslint-disable-next-line import/extensions
import usersRouter from './controllers/usersRouter.js';
// eslint-disable-next-line import/extensions
import MONGODB_DB from './utils/config.js';
import loginRouter from './controllers/loginRouter.js';

const app = express();

app.use(express.json());
app.use(cors());

if (mongoose.connection.closed || mongoose.connection.closed === undefined) {
    await mongoose.connect(`mongodb://localhost:27017/${MONGODB_DB}`);
}

app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

app.use(unknowEndpointHandler);
app.use(authErrorHandler);
app.use(mongoServerErrorHandler);
app.use(errorHandler);

export default app;
