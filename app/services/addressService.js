import { AsyncStorage, Alert } from "react-native";
import axios from 'axios';
import qs from 'qs';
import USER_KEY from './authService';

export const getAddress = ( ) => {
    return new Promise((resolve, reject) => {
      
       
       axios({
         method: 'get',
         url: '/api/address',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + AsyncStorage.getItem(USER_KEY, (err)=>{
               console.log(err);
           })
         }
       })
       .then(res => {
         if(res.status === 400 || res.status === 403){
           reject(res);
         }
       
         resolve(res);
       
       })
       .catch(err => {
         reject(err.response);
       });


     });
   }