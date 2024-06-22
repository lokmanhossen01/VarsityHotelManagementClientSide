import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSec = () => {
  const { logOutAcc } = useAuth();
  const naviget = useNavigate();
  axiosSecure.interceptors.response.use(
    (res) => {
      //   console.log('Interceptor result: ', res);
      return res;
    },
    async (error) => {
      console.log('Axios Interceptor error:  ', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        logOutAcc();
        naviget('/login');
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSec;
