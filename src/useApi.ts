// useApi.ts
import axios from 'axios';
import { useContext, useMemo } from 'react';
import { AuthContext } from './auth/authContext';
import { useNavigate } from 'react-router-dom';
import { error } from 'console';

export function useApi() {
    //@ts-ignore
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate()

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true,
    });

    instance.interceptors.response.use((response) => {
      if (response.data.accessToken) {
        let accessToken:string  = response.data.accessToken
        let privilegeLevel:number = response.data.privilegeLevel
        setAccessToken({accessToken,privilegeLevel})
        
        console.log("new access token set")
      }

    
      console.log(response)
      return response;
    });

    // instance.interceptors.request.use((config) => {
    //   if (accessToken) {
    //     config.headers['Authorization'] = `Bearer ${accessToken}`;
    //   }
    //   return config;
    // });

    return instance;
  }, [accessToken, setAccessToken]);

  return api;
}