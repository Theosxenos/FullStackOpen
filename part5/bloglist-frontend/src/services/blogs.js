import axios from 'axios';

const baseUrl = '/api/blogs';

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getAllSorted = async () => {
  const blogs = await getAll();
  // return blogs.sort((blogA, blogB) => {
  //     const likesA = blogA.likes;
  //     const likesB = blogB.likes;
  //
  //     if (likesA > likesB) {
  //         return -1;
  //     }
  //     if(likesA < likesB) {
  //         return 1;
  //     }
  //
  //     return 0;
  // });

  // Reverse for ascending
  return blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);
};

const addNewBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateBlog = async (id, blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const updatedBlog = { ...blog };
  delete updatedBlog.user;

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setToken,
  getAll,
  getAllSorted,
  addNewBlog,
  updateBlog,
  deleteBlog,
};
