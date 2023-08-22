/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ onBlogFormSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onBlogFormSubmit({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />

        <label htmlFor="author">
          author
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />

        <label htmlFor="url">url</label>
        <input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        <br />

        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  onBlogFormSubmit: PropTypes.func.isRequired,
};

export default BlogForm;
