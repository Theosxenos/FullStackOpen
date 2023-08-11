import { Router } from 'express';
// eslint-disable-next-line import/extensions
import BlogRepository from '../repositories/BlogRepository.js';

const blogRepository = new BlogRepository();
const blogsRouter = new Router();

blogsRouter.get('/', async (request, response, next) => {
    try {
        response.json(await blogRepository.getAllBlogs());
    } catch (e) {
        next(e);
    }
});

blogsRouter.post('/', async (request, response) => {
    try {
        const result = await blogRepository.addNewBlog(request.body);
        console.log(result);
        response.status(201)
            .send();
    } catch (e) {
        console.error(e);
        response.status(400)
            .send({ error: e.message });
    }
});

export default blogsRouter;
