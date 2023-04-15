import axios from 'axios';

export const BASE_URL = 'http://localhost:3000/';

export const getTasks = () => axios.get(BASE_URL + 'posts');
export const createTask = (data) => axios.post(BASE_URL + 'posts', data);
export const editTask = (id,data) => axios.put(BASE_URL + 'posts/' + id,data);
export const deleteTask = (id) => axios.delete(BASE_URL + 'posts/' + id);
