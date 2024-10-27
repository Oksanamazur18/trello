import axios from 'axios';
import { api } from '../common/constants'; 

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 123', 
  },
});


export const setupInterceptors = (setProgress: (progress: number) => void) => {
  console.log()
  instance.interceptors.request.use((config) => {
    setProgress(0); 
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      console.log(response.data+"rd")
      setProgress(100); 
      return response;
    },
    (error) => {
      setProgress(0);
      return Promise.reject(error);
    }
  );

  instance.defaults.onDownloadProgress = (progressEvent) => {
    const total = progressEvent.total ?? progressEvent.bytes; 
console.log(progressEvent.loaded)
    if (total) {
      const percentage = Math.floor((progressEvent.loaded * 100) / total);
      setProgress(percentage);
      console.log(`Завантажено ${percentage}%`);
    } else {
      setProgress(progressEvent.loaded)
      console.log(`Завантажено ${progressEvent.loaded} байтів`);
     
    }
  };
  
};


export default instance;
