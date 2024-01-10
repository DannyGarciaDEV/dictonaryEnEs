import axios from 'axios';
const baseUrl = 'http://localhost:3001/words';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => {
    console.log('Get All Words Response:', response.data);
    return response.data;
  });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => {
    console.log('Create Word Response:', response.data);
    return response.data;
  });
};

const removeWord = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => {
    console.log('Remove Word Response:', response.data);
    return response.data;
  });
};

const updateWord = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => {
    console.log('Update Word Response:', response.data);
    return response.data;
  });
};

export default { getAll, create, removeWord, updateWord };