import axios, { AxiosInstance } from 'axios';
import { useContext, useMemo } from 'react';
import { AuthContext } from './auth/authContext';
import { useNavigate } from 'react-router-dom';

export function useApi(): AxiosInstance {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error with auth provider');  // could have just done const { accessToken, setAuth } = useContext(AuthContext); but typescript keeps thowing errors
  }
  const { accessToken, setAuth } = context;
  const navigate = useNavigate();

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
      withCredentials: true,
    });

    instance.interceptors.request.use((config) => {
      if (accessToken || accessToken == null) {
        console.log("fired")
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => {
        if (response.data.accessToken) {
          setAuth({
            accessToken: response.data.accessToken,
            privilegeLevel: response.data.privilegeLevel,
          });
          console.log("new access token set");
          console.log(accessToken)
          console.log(response.data.accessToken)
        }
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [accessToken, setAuth, navigate]);

  return api;
}