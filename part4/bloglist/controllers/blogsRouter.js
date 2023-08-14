import { Router } from 'express';
// eslint-disable-next-line import/extensions
import blogRepository from '../repositories/BlogRepositorySingleton.js';

const blogsRouter = new Router();

blogsRouter.get('/', async (request, response) => {
    response.json(await blogRepository.getAllBlogs());
});

blogsRouter.post('/', async (request, response) => {
    const result = await blogRepository.addNewBlog(request.body);
    response.status(201)
        .json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id.toString();
    const result = await blogRepository.deleteBlogById(id);

    if (!result) {
        throw new Error('blog not found');
    }

    response.status(204)
        .end();
});

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id.toString();
    const blog = request.body;

    const result = await blogRepository.updateBlogById(id, blog);

    if (!result) {
        throw new Error('blog not found');
    }

    response.status(204)
        .end();
});

export default blogsRouter;
