/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import BlogRepository from './repositories/BlogRepository.js';
import Logger from './utils/Logger.js';

const app = express();
const blogRepository = new BlogRepository();

app.use(express.json());
app.use(cors());

// const blogSchema = new mongoose.Schema()

// const Blog = mongoose.model('Blog', blogSchema)

app.get('/api/blogs', async (request, response, next) => {
    try {
        response.json(await blogRepository.getAllBlogs());
    } catch (e) {
        next(e);
    }
});

app.post('/api/blogs', async (request, response, next) => {
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

const PORT = 3001;
app.listen(PORT, () => {
   Logger.info(`Server running on port ${PORT}`);
});
