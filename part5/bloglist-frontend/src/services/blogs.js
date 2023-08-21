import axios from 'axios'
const baseUrl = '/api/blogs'

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNewBlog = async (blog) => {
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
}

const updateBlog = async (id, blog) => {
  const config = {
    headers: {Authorization: token},
  }

  delete blog.user;

  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, addNewBlog, updateBlog }
