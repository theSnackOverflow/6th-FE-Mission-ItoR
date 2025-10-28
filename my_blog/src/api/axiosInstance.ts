import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '', // ! .env 적용이 안돼서 일단 임시로
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

export default axiosInstance;
