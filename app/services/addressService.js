import { AsyncStorage } from "react-native";
import axios from 'axios';
import qs from 'qs';
import USER_KEY from './authService';


axios.defaults.baseURL = 'http://fixwebapi.azurewebsites.net';

// const getAccessToken = () => {
//     AsyncStorage.getItem('access_token').then((value) => {
//         console.log(value);
//         if(value !== null){
           
//         }
       
//     }).done();
// }

export const getAddress = ( ) =>{
        return new Promise((resolve, reject) => {

            axios({
              method: 'get',
              url: '/api/addresses/7',
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(res => {
              if(res.status === 400 || res.status === 403){
                reject(res);
              }
              console.log(res);
              resolve(res);
            
            })
            .catch(err => {
              reject(err.response);
            });
     
     
          });
  
   }