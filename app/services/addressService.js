import { AsyncStorage, Alert } from "react-native";
import axios from 'axios';
import qs from 'qs';
import USER_KEY from './authService';

export const getAddress = ( ) => {
    return new Promise((resolve, reject) => {
       axios({
         method: 'get',
         url: '/api/users',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + AsyncStorage.getItem(USER_KEY).then(result=>{
             console.log(result);
             return result;
           })
         }
       })
       .then(res => {
         if(res.status === 400 || res.status === 403){
           reject(res);
         }
         console.log(res.data);
         resolve(res);
       
       })
       .catch(err => {
         reject(err.response);
       });


     });
   }