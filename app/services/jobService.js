import { AsyncStorage } from "react-native";
import axios from 'axios';
import qs from 'qs';
import USER_KEY from './authService';

export const postJob = ( job ) => {
    return new Promise((resolve, reject) => {
       axios({
         method: 'post',
         url: '/api/jobs',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
         },
         data: qs.stringify(job)
       })
       .then(res => {
         if(res.status === 400 || res.status === 403){
           reject(res);
         }
         axios.defaults.headers.common['Authorization'] = 'Bearer '+res.access_token;
         AsyncStorage.setItem(USER_KEY, axios.defaults.headers.common['Authorization']);
         resolve(res);
       
       })
       .catch(err => {
         reject(err.response);
       });
     });
   }