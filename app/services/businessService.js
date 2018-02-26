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

export const getBusinesses= ( ) =>{
  return new Promise((resolve, reject) => {

      axios({
        method: 'get',
        url: '/api/businesses/',
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

export const searchBusiness = ( businessQuery ) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/businesses/searchbusiness',
      headers: {
        'Content-Type': 'application/json'
      },
      data: businessQuery
    })
    .then(res => {
      if(res.status === 400 || res.status === 403){
        reject(res);
      }
      resolve(res.data);
    
    })
    .catch(err => {
      reject(err.response);
    });
  });
}


export const postBusiness = ( business ) =>{
  return new Promise((resolve, reject) => {

      axios({
        method: 'post',
        url: '/api/businesses/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: business
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