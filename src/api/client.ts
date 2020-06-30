import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'TODO',
  }),
);
