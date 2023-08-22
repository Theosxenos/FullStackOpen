import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogList = ({
  blogs,
  onBlogUpdate,
  onBlogDelete,
  username,
}) => {
  if (!blogs || blogs.length === 0) {
    return <p>No blogs found</p>;
  }

  return (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onBlogLike={(b) => onBlogUpdate(b)}
          canDelete={username === blog.user.username}
          onDelete={(b) => onBlogDelete(b)}
        />
      ))}
    </>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string,
    }),
  ).isRequired,
  onBlogUpdate: PropTypes.func.isRequired,
  onBlogDelete: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default BlogList;
