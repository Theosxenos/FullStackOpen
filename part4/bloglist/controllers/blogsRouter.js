import { Router } from 'express';
// eslint-disable-next-line import/extensions
import blogRepository from '../repositories/BlogRepositorySingleton.js';
import authService from '../services/AuthService.js';
import userRepository from '../repositories/UserRepositorySingleton.js';

const blogsRouter = new Router();

blogsRouter.get('/', async (request, response) => {
    response.json(await blogRepository.getAllBlogs());
});

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
    const decodedToken = authService.decodeToken(request.token);

    if (!decodedToken.id) {
        response.status(401)
            .json({ error: 'token invalid' });
    }

    const user = await userRepository.getUserById(decodedToken.id);
    const newBlog = {
        ...request.body,
        // eslint-disable-next-line no-underscore-dangle
        user: user._id,
    };

    const result = await blogRepository.addNewBlog(newBlog);
    response.status(201)
        .json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = authService.decodeToken(request.token);

    if (!decodedToken.id) {
        return response.status(401)
            .json({ error: 'token invalid' });
    }

    const id = request.params.id.toString();
    const toDeleteBlog = await blogRepository.getBlogById(id);

    if (!toDeleteBlog) {
        return response.status(404)
            .send({ error: 'blog not found' });
    }

    if (toDeleteBlog.user.toString() !== decodedToken.id) {
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
