import { create } from 'apisauce';

export const baseURL = 'https://api.dastank.dasstack.com/';

export const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
};

// define the api
const api = create({
  baseURL: baseURL,
  headers: headers,
  timeout: 80 * 1000,
});

export default api;
