import express from 'express';
import cors from 'cors';
import 'express-async-errors';
// eslint-disable-next-line import/extensions
import blogsRouter from './controllers/blogsRouter.js';
// eslint-disable-next-line import/extensions
import { errorHandler, unknowEndpointHandler } from './utils/middleware.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/blogs', blogsRouter);

app.use(unknowEndpointHandler);
app.use(errorHandler);

export default app;
