import axios from 'axios';

const baseUrl = 'http://localhost:3001/words';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log('Get All Words Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get All Words Error:', error);
    throw error; // Propagate the error to the caller
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    console.log('Create Word Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Create Word Error:', error);
    throw error;
  }
};

const removeWord = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    console.log('Remove Word Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Remove Word Error:', error);
    throw error;
  }
};

const updateWord = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    console.log('Update Word Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update Word Error:', error);
    throw error;
  }
};

export default { getAll, create, removeWord, updateWord };
