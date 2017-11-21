import { AsyncStorage } from "react-native";
import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'http://fixwebapi.azurewebsites.net';
axios.defaults.headers.common['Authorization'] = '';

export const USER_KEY = "token";

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {

    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const loginUserAccount = ( loginUser ) => {
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
      AsyncStorage.setItem(USER_KEY, "true");
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
      }
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err.response);
    });
  });
}


