import { AsyncStorage } from "react-native";
import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'http://fixwebapi.azurewebsites.net';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const postUserAccount = ( postUser ) => {
 return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/oauth/token',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: qs.stringify(postUser)
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
  });
}

export const loginUserAccount = ( username, password ) => {
  return axios.post('/user', {
    username: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {

    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          setTimeout(()=>{
            resolve(true);
          }, 2000);
        } else {
          setTimeout(()=>{
            resolve(false);
          }, 2000);
        }
      })
      .catch(err => reject(err));

  });
};

