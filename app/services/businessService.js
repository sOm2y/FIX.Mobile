import { AsyncStorage } from "react-native";
import axios from 'axios';
import qs from 'qs';
import USER_KEY from './authService';


axios.defaults.baseURL = 'http://fixwebapi.azurewebsites.net';


export const getBusinessCategories= ( ) =>{
  return new Promise((resolve, reject) => {

      axios({
        method: 'get',
        url: '/api/businesscategories/',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if(res.status === 400 || res.status === 403){
          reject(res);
        }
        console.log(res);
        resolve(res.data);
      
      })
      .catch(err => {
        reject(err.response);
      });
    });
}


export const postBusiness = ( Business ) =>{
  return new Promise((resolve, reject) => {

      axios({
        method: 'post',
        url: '/api/addresses/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: qs.stringify(Business)
      })
      .then(res => {
        if(res.status === 400 || res.status === 403){
          reject(res);
        }
        console.log(res);
        resolve(res.data);
      
      })
      .catch(err => {
        reject(err.response);
      });
    });
}