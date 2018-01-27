import { AsyncStorage } from "react-native";
import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'http://fixwebapi.azurewebsites.net';
axios.defaults.headers.common['Authorization'] = '';

export const USER_KEY = "access_token";

// export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const getAccessToken = () => {
  return AsyncStorage.getItem(USER_KEY);
}


export const loginUserAccount = ( loginUser ) =>{
 return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(loginUser)
    })
    .then(res => {
      if(res.status === 400 || res.status === 403){
        reject(res);
      }
      console.log(res.data.access_token);
      axios.defaults.headers.common['Authorization'] = 'Bearer '+ res.data.access_token;
      AsyncStorage.setItem(USER_KEY, res.data.access_token);
      resolve(res);
    
    })
    .catch(err => {
      reject(err.response);
    });
  });
}

export const postUserAccount = ( postUser ) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/users',
      headers: {
        'Content-Type': 'application/json'
      },
      data: postUser
    })
    .then(res => {
      AsyncStorage.setItem(USER_KEY, "true");
      resolve(res);
    })
    .catch(err => {
      reject(err.response);
    });
  });
}


