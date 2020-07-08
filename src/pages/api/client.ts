import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.ENDPOINT ?? 'http://localhost:4000/',
});

client.interceptors.response.use((response) => response.data);
