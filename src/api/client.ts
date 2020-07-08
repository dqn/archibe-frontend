import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

export const client = applyCaseMiddleware(
  axios.create({
    ...(process.env.NODE_ENV !== 'production'
      ? { baseURL: `http://localhost:${process.env.PORT ?? 3000}/` }
      : { baseURL: process.env.ENDPOINT }),
  }),
);

client.interceptors.response.use((response) => response.data);
