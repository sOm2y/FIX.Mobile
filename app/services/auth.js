import { AsyncStorage } from "react-native";
import axios from 'axios';


axios.defaults.baseURL = 'http://fixwebapi.azurewebsites.net';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

const POST_USER = {
  username: '',
  fisrtname: '',
  lastname: '',
  email: '',
  phonenumber: '',
  password: '',
  confirmpassword:''
};

export const postUserAccount = ( postUser ) => {
  return axios.post('/api/users', {
          username: postUser.username,
          fisrtname: postUser.password,
          lastname: postUser.lastname,
          email: postUser.email,
          phonenumber: postUser.phonenumber,
          password: postUser.password,
          confirmpassword:postUser.confirmpassword
        }).then(res => {
          if(res != null){
            console.log(res);
          }
          
        }).catch( error => {
          console.log(error);
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

