// eslint-disable-next-line import/no-extraneous-dependencies,import/extensions
import _ from 'lodash';

// import groupBy from 'lodash/groupBy';
// import map from 'lodash/map';
// import maxBy from 'lodash/maxBy';

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs
    .reduce((currentSum, currentBlog) => currentSum + currentBlog.likes, 0);

const favoriteBlog = (blogs) => blogs
    .reduce((prev, current) => ((prev.likes > current.likes) ? prev : current));

const mostBlogs = (blogs) => _.chain(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => ({
        author,
        blogs: authorBlogs.length,
    }))
    .maxBy('blogs')
    .value();

const mostLikes = (blogs) => _.chain(blogs)
    .groupBy('author')
    .map((authorBlogs, author) => ({
        author,
        likes: _.sumBy(authorBlogs, 'likes'),
    }))
    .maxBy('likes')
    .value();

export {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};
