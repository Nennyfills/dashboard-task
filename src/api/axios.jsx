import axios from 'axios';

const Http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const setToken = {
  getToken: () => '',
};

Http.defaults.baseURL = `${process.env.REACT_APP_API_URL}` || 'http://178.63.13.157:8090/mock-api/api';
Http.defaults.headers.common.Accept = 'application/json';
Http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

Http.interceptors.request.use(
  async (config) => {
    const token = await setToken.getToken();
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Http;
