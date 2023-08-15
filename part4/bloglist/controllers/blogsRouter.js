import { Router } from 'express';
// eslint-disable-next-line import/extensions
import blogRepository from '../repositories/BlogRepositorySingleton.js';

const blogsRouter = new Router();

// blogsRouter.get('/', async (request, response) => {
//     response.json(await blogRepository.getAllBlogs());
// });

blogsRouter.get('/:id', async (req, res) => {
    const blog = await blogRepository.getBlogById(req.params.id.toString());
    if (!blog) {
        res.status(404)
            .send({ error: 'blog not found' });
    }

    res.status(200)
        .send(blog);
});

blogsRouter.post('/', async (request, response) => {
    const { user } = request;

    if (!user) {
        return response.status(401)
            .json({ error: 'token invalid' });
    }

    const newBlog = {
        ...request.body,
        user,
    };

    const result = await blogRepository.addNewBlog(newBlog);
    return response.status(201)
        .json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
    const { user } = request;

    if (!user) {
        return response.status(401)
            .json({ error: 'token invalid' });
    }

    const id = request.params.id.toString();
    const toDeleteBlog = await blogRepository.getBlogById(id);

    if (!toDeleteBlog) {
        return response.status(404)
            .send({ error: 'blog not found' });
    }

    if (toDeleteBlog.user.toString() !== user) {
        return response.status(401)
            .send({ error: 'wrong user' });
    }

    await blogRepository.deleteBlogById(id);

    return response.status(204)
        .end();
});

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id.toString();
    const blog = request.body;

    const result = await blogRepository.updateBlogById(id, blog);

    if (!result) {
        return response.status(404)
            .send({ error: 'blog not found' });
    }

    response.status(204)
        .end();
});

export default blogsRouter;
