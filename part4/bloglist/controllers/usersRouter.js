import { Router } from 'express';
// eslint-disable-next-line import/extensions
import userRepository from '../repositories/userRepositorySingleton.js';

const usersRouter = new Router();

usersRouter.get('/', async (request, response) => {
    response.json(await userRepository.getAllUsers());
});

usersRouter.post('/', async (request, response) => {
    const result = await userRepository.addNewUser(request.body);
    response.status(201)
        .json(result);
});

// usersRouter.delete('/:id', async (request, response) => {
//     const id = request.params.id.toString();
//     const result = await userRepository.deleteBlogById(id);
//
//     if (!result) {
//         throw new Error('blog not found');
//     }
//
//     response.status(204)
//         .end();
// });
//
// usersRouter.put('/:id', async (request, response) => {
//     const id = request.params.id.toString();
//     const blog = request.body;
//
//     const result = await userRepository.updateBlogById(id, blog);
//
//     if (!result) {
//         throw new Error('blog not found');
//     }
//
//     response.status(204)
//         .end();
// });

export default usersRouter;
